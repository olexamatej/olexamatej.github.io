Simple site with just one button.

![alt text](imgs/image.png)

But after pushing it, we will get
~~~
We apologize, but we have no guest services at the moment.
~~~

Since the challenge is called 'power_cookie', one might assume that it has something to do with cookies.
If we check them, we can see that there is 'isAdmin' with boolean value.

![alt text](imgs/image-1.png)

If guest service is unavailable, the admin one might be.

After booting burpsuite and running intercept, we can see the GET request that is sent after clicking on 'continue as guest'. There is a `Cookie:` with `isAdmin=0`

![alt text](imgs/image-2.png)

We can change the boolean value, forward the intercepted request and get the flag.
