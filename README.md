# wjk-app-cli

#### react/vue template 
 1 install 
 
 ```
 sudo npm install wjk-app -g
 ```
 
 2 how to use ?
 
(1) To create one project named my-app , you can run this commmand:

```
wjk-app create my-app 
``` 
After that terminal will has one selection to select Vue or React project .

Look like to this:

![image](https://user-images.githubusercontent.com/41052302/153760203-d16566cb-e4e0-40b2-99d5-0783f4b8c19a.png)

(2) To use commitlint, eslint/tslint, husky, prettier in your project ,you can use the following command:

```
wjk-app install codelint
```
Look like to this:

![image](https://user-images.githubusercontent.com/41052302/153760359-110fda51-690a-4282-9189-1a8c65098b93.png)

it can support eslint / tslint , Vue or React 

What can wjk-app codelint bring ?

1),  common code style

2),  commlit lint 

3), format code use prettier and eslint / tslint  when you run git commit , it is an incremental check , in another way , it only format code in this commit .

Thanks to:

https://github.com/1623311678/Book

you can use react hook ,sass,less,jsx,tsx and so on
