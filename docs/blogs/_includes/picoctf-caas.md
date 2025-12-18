![alt text](imgs/image.png)

This is the whole site for `https://caas.mars.picoctf.net/cowsay/flag`, where the 'cowsay' says the thing after `cowsay/` in url.

If we can end the string for text, we should be able to use unix filesystem and find the flag.

Putting this into URL  `.../cowsay/flag;echo test`
Gives us this :
![alt text](imgs/image-1.png)

We can see, that with `;` we can end the string and then use commands.

Using `.../cowsay/flag;ls` we are able to list all the files in current directory.

![alt text](imgs/image-2.png)

And at last, `.../cowsay/flag;cat falg.txt` prints us the flag from `falg.txt`


![alt text](imgs/image-3.png)

