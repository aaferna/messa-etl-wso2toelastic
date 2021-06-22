
<p align="center">
  <img src="https://raw.githubusercontent.com/gusgeek/Messa/main/logo.png">
  <br>
  ETL for WSO2 Logs in Elastic Stack
</p>


## How to Start
1. Make a copy of this repository on your computer
2. Make sure you have installed Node in LTS version for better compatibility
3. Located in the same directory that I downloaded the repository, in a terminal, put node index.js -h to get help
3.1 If you want to start the application and have its configuration file, do it with ``` node index.js -c = "./ config.json" ```

## Configuration file

1. You need to adjust the logging pattern that WSo2 has in its "log4j2.properties" file.

```java
appender.CARBON_LOGFILE.layout.pattern = $l2ji$ %n _&!_ %appName _&!_ %d{yyyy-MM-dd HH:mm:ss,SSSZ} _&!_ %p _&!_ %c _&!_ %m%ex %n$l2je$ %n
```

be attentive to this example, you will see that the Carbon pattern is adjusted. For each API that you develop, you will have to adjust this same line but indicating the name of the API that you put together.

2. Create a .json file in the same directory as the index.js of this project, with the following format:

```json
  {
      "server": "http://127.0.0.1:9200",
      "varset": "/wso2",
      "logfile": "D:\\ELK\\wso2am-4.0.0\\wso2am-4.0.0\\repository\\logs\\wso2carbon.log"
  }
```

  - Where it says logfile specify the name of the file that I configure in the log4j2.properties of your api.
  - The varset is the index variable that I develop for the API. If I don't modify the Git. You should make a PUT to your ElasticSearch with the name of the index you want and the following Json.

```json
{
    "mappings": {
        "properties": {
            "date": {
                "type": "date",
                "format": "yyyy-MM-d HH:mm:ss,SSSZ"
            },
            "app": {
                "type": "keyword"
            },
            "type": {
                "type": "keyword"
            },
            "runner": {
                "type": "keyword"
            },
            "message": {
                "type": "text"
            }
        }
    }
}
```

<br><br>
<p align="center">
    <img src="https://img.shields.io/github/downloads/gusgeek/jsDolar/total">  
    <img src="https://img.shields.io/github/v/release/gusgeek/jsDolar">  
    <img src="https://img.shields.io/github/release-date/gusgeek/jsDolar">  
    <img src="https://img.shields.io/github/languages/code-size/gusgeek/jsDolar">
  <br><br>
  <strong>:pencil2: con :heart:</strong>
</p>
