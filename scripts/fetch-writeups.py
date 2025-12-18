#!/usr/bin/env python3
"""
Fetch writeups from GitHub repositories and generate Quarto blog posts
This script reads the writeups-config.json and fetches writeup data from each repo
"""

import json
import os
import re
from pathlib import Path
from urllib.request import urlopen, Request
from datetime import datetime

CONFIG_FILE = 'writeups-config.json'
OUTPUT_DIR = 'blogs/writeups'
INCLUDES_DIR = 'blogs/_includes'

def https_get(url):
    """Make HTTPS request to GitHub API"""
    headers = {
        'User-Agent': 'Python Script',
        'Accept': 'application/vnd.github.v3+json'
    }
    req = Request(url, headers=headers)
    try:
        with urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        # Return error info
        raise Exception(f"Failed to fetch {url}: {str(e)}")

def get_repo_tree(owner, repo, branch='main'):
    """Fetch repository tree"""
    # Try main first, then master
    for branch_name in [branch, 'master', 'main']:
        try:
            url = f'https://api.github.com/repos/{owner}/{repo}/git/trees/{branch_name}?recursive=1'
            return https_get(url)
        except Exception as e:
            if branch_name == 'main':  # Last attempt
                continue
            else:
                raise e
    raise Exception(f"Could not find tree for any branch")

def find_solution_files(tree):
    """Find all solution.md files in the repo tree"""
    solutions = []
    for item in tree.get('tree', []):
        if item['path'].endswith('solution.md') and item['type'] == 'blob':
            path_parts = item['path'].split('/')
            challenge_name = path_parts[-2] if len(path_parts) > 1 else 'root'
            solutions.append({
                'path': item['path'],
                'challengeName': challenge_name,
                'sha': item.get('sha', '')
            })
    return solutions

def generate_slug(repo_name, challenge_name):
    """Generate slug from repo and challenge name"""
    slug = f"{repo_name}-{challenge_name}".lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def fetch_raw_content(owner, repo, file_path):
    """Fetch raw markdown content from GitHub"""
    # Try both main and master branches
    for branch in ['main', 'master']:
        url = f'https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{file_path}'
        try:
            req = Request(url, headers={'User-Agent': 'Python Script'})
            with urlopen(req) as response:
                return response.read().decode('utf-8')
        except Exception as e:
            if branch == 'master':  # Last attempt
                print(f"\n      Warning: Could not fetch {file_path}: {e}")
                return None
            continue
    return None

def generate_quarto_post(config, repo, challenge):
    """Generate Quarto blog post content"""
    slug = generate_slug(repo['name'], challenge['challengeName'])
    repo_url = f"https://github.com/{repo['owner']}/{repo['name']}"
    challenge_dir = os.path.dirname(challenge['path'])
    challenge_url = f"{repo_url}/tree/main/{challenge_dir}"
    raw_url = f"https://raw.githubusercontent.com/{repo['owner']}/{repo['name']}/main/{challenge['path']}"
    
    difficulty = config['difficulties'][repo['difficulty']]
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Clean up challenge name for display
    display_name = challenge['challengeName'].replace('-', ' ').replace('_', ' ').title()
    
    content = f"""---
title: "{display_name}"
description: "Writeup from {repo['displayName']}"
author: "Matej Olexa"
date: "{today}"
categories: [{repo['category']}, {difficulty['label']}]
difficulty: "{repo['difficulty']}"
repo: "{repo['name']}"
challenge-url: "{challenge_url}"
image: "https://opengraph.githubassets.com/1/{repo['owner']}/{repo['name']}"
---

::: {{.callout-note}}
## Challenge Info
**Repository:** [{repo['displayName']}]({repo_url}) {repo['icon']}  
**Difficulty:** <span style="color: {difficulty['color']}; font-weight: bold;">{difficulty['label']}</span>  
**Category:** {repo['category']}  
**View on GitHub:** [Challenge Files]({challenge_url})
:::

## Solution

{{{{< include ../../_includes/{slug}.md >}}}}

::: {{.callout-tip collapse="true"}}
## View Full Repository
Check out more challenges from this repository: [{repo['displayName']}]({repo_url})

{repo['description']}
:::
"""
    return content

def main():
    """Main execution"""
    print('🚀 Fetching writeups from GitHub repositories...\n')
    
    # Load configuration
    with open(CONFIG_FILE, 'r') as f:
        config = json.load(f)
    
    # Create output directories
    Path(OUTPUT_DIR).mkdir(parents=True, exist_ok=True)
    Path(INCLUDES_DIR).mkdir(parents=True, exist_ok=True)
    
    total_writeups = 0
    summary = []
    
    # Process each repository
    for repo in config['repositories']:
        print(f"📦 Processing {repo['displayName']}...")
        
        try:
            tree = get_repo_tree(repo['owner'], repo['name'])
            solutions = find_solution_files(tree)
            
            print(f"   Found {len(solutions)} writeups")
            total_writeups += len(solutions)
            
            # Generate a post for each challenge
            for challenge in solutions:
                slug = generate_slug(repo['name'], challenge['challengeName'])
                post_path = Path(OUTPUT_DIR) / f"{slug}.qmd"
                include_path = Path(INCLUDES_DIR) / f"{slug}.md"
                
                # Generate Quarto post
                content = generate_quarto_post(config, repo, challenge)
                post_path.write_text(content)
                
                # Fetch and save the actual markdown content
                print(f"   → Fetching {challenge['challengeName']}...", end=' ')
                raw_content = fetch_raw_content(repo['owner'], repo['name'], challenge['path'])
                
                if raw_content:
                    # Clean up the content (remove any problematic formatting)
                    cleaned_content = raw_content.replace('```', '~~~')  # Avoid nested code blocks
                    include_path.write_text(cleaned_content)
                    print('✓')
                else:
                    # Create placeholder
                    placeholder = f"""This writeup is available on GitHub at:
[View original solution.md ↗](https://github.com/{repo['owner']}/{repo['name']}/blob/main/{challenge['path']})

**Note:** Content could not be automatically fetched. Please visit the link above.
"""
                    include_path.write_text(placeholder)
                    print('⚠️ (placeholder)')
            
            summary.append({
                'repo': repo['displayName'],
                'count': len(solutions),
                'difficulty': config['difficulties'][repo['difficulty']]['label']
            })
            
        except Exception as error:
            print(f"   ✗ Error processing {repo['displayName']}: {error}")
        
        print('')
    
    # Print summary
    print('═' * 50)
    print('✅ SUMMARY')
    print('═' * 50)
    for s in summary:
        print(f"{s['repo']:<25} {s['count']} writeups ({s['difficulty']})")
    print('─' * 50)
    print(f"Total: {total_writeups} writeups generated")
    print('═' * 50)
    print()
    
    print('📝 Next steps:')
    print('   1. Review generated files in blogs/writeups/')
    print('   2. Run: quarto render blogs/')
    print('   3. Visit /blogs/writeups/ on your site')
    print()

if __name__ == '__main__':
    main()
