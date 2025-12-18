#!/usr/bin/env node

/**
 * Fetch writeups from GitHub repositories and generate Quarto blog posts
 * This script reads the writeups-config.json and fetches writeup data from each repo
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

const CONFIG_FILE = 'writeups-config.json';
const OUTPUT_DIR = 'blogs/writeups';

/**
 * Make HTTPS request
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Node.js Script',
        'Accept': 'application/vnd.github.v3+json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch repository tree
 */
async function getRepoTree(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
  return await httpsGet(url);
}

/**
 * Find all solution.md files in the repo tree
 */
function findSolutionFiles(tree) {
  return tree.tree
    .filter(item => item.path.endsWith('solution.md') && item.type === 'blob')
    .map(item => ({
      path: item.path,
      challengeName: path.dirname(item.path).split('/').pop() || 'root'
    }));
}

/**
 * Generate slug from challenge name
 */
function generateSlug(repoName, challengeName) {
  return `${repoName}-${challengeName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * Generate Quarto metadata
 */
function generateQuartoPost(config, repo, challenge) {
  const slug = generateSlug(repo.name, challenge.challengeName);
  const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;
  const challengeUrl = `${repoUrl}/tree/main/${path.dirname(challenge.path)}`;
  const rawUrl = `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/main/${challenge.path}`;
  
  const difficulty = config.difficulties[repo.difficulty];
  
  return `---
title: "${challenge.challengeName}"
description: "From ${repo.displayName}"
author: "Matej Olexa"
date: "${new Date().toISOString().split('T')[0]}"
categories: [${repo.category}, ${difficulty.label}]
difficulty: "${repo.difficulty}"
repo: "${repo.name}"
challenge-url: "${challengeUrl}"
image: "https://opengraph.githubassets.com/1/${repo.owner}/${repo.name}"
---

::: {.callout-note}
## Challenge Info
**Repository:** [${repo.displayName}](${repoUrl}) ${repo.icon}  
**Difficulty:** <span style="color: ${difficulty.color}; font-weight: bold;">${difficulty.label}</span>  
**Category:** ${repo.category}  
**View on GitHub:** [Challenge Files](${challengeUrl})
:::

<!--
Original writeup content will be embedded below from:
${rawUrl}
-->

<div id="writeup-content">

{{< include ../../_includes/${slug}.md >}}

</div>

::: {.callout-tip collapse="true"}
## View Full Repository
Check out more challenges from this repository: [${repo.displayName}](${repoUrl})

${repo.description}
:::
`;
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🚀 Fetching writeups from GitHub repositories...\n');
    
    // Load configuration
    const configData = await fs.readFile(CONFIG_FILE, 'utf8');
    const config = JSON.parse(configData);
    
    // Create output directories
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.mkdir('blogs/_includes', { recursive: true });
    
    let totalWriteups = 0;
    const summary = [];
    
    // Process each repository
    for (const repo of config.repositories) {
      console.log(`📦 Processing ${repo.displayName}...`);
      
      try {
        const tree = await getRepoTree(repo.owner, repo.name);
        const solutions = findSolutionFiles(tree);
        
        console.log(`   Found ${solutions.length} writeups`);
        totalWriteups += solutions.length;
        
        // Generate a post for each challenge
        for (const challenge of solutions) {
          const slug = generateSlug(repo.name, challenge.challengeName);
          const postPath = path.join(OUTPUT_DIR, `${slug}.qmd`);
          const includePath = path.join('blogs/_includes', `${slug}.md`);
          
          // Generate Quarto post
          const content = generateQuartoPost(config, repo, challenge);
          await fs.writeFile(postPath, content);
          
          // Create placeholder for include (you'll need to manually fetch or embed)
          const rawUrl = `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/main/${challenge.path}`;
          const includeContent = `<!-- Fetch content from: ${rawUrl} -->\n\n` +
            `**Note:** This writeup is automatically synced from the [GitHub repository](${rawUrl}).\n\n` +
            `[View original solution.md ↗](${rawUrl})`;
          
          await fs.writeFile(includePath, includeContent);
          
          console.log(`   ✓ Generated ${slug}.qmd`);
        }
        
        summary.push({
          repo: repo.displayName,
          count: solutions.length,
          difficulty: config.difficulties[repo.difficulty].label
        });
        
      } catch (error) {
        console.error(`   ✗ Error processing ${repo.displayName}:`, error.message);
      }
      
      console.log('');
    }
    
    // Print summary
    console.log('═══════════════════════════════════════════════');
    console.log('✅ SUMMARY');
    console.log('═══════════════════════════════════════════════');
    summary.forEach(s => {
      console.log(`${s.repo.padEnd(25)} ${s.count} writeups (${s.difficulty})`);
    });
    console.log('───────────────────────────────────────────────');
    console.log(`Total: ${totalWriteups} writeups generated`);
    console.log('═══════════════════════════════════════════════\n');
    
    console.log('📝 Next steps:');
    console.log('   1. Review generated files in blogs/writeups/');
    console.log('   2. Optionally fetch actual markdown content from repos');
    console.log('   3. Run: quarto render blogs/');
    console.log('   4. Visit /blogs/writeups/ on your site\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
