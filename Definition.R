#CALLING API for dictionary
#reading in word via command line
#install.packages('jsonlite', repos='http://cran.us.r-project.org')
#library(jsonlite)
newWord = commandArgs()
cat(newWord)
q()
wordSearch <- "http://api.wordnik.com:80/v4/word.json/query/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
newSearch <- gsub("query", newWord, wordSearch)
wordDef <- fromJSON(newSearch)
wordDefText <- wordDef$text
cat(wordDefText[1])
