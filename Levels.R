
# in file directory: tag-english name.txt > name2.txt

trial = read.table("C:\\Users\\tarre\\Desktop\\name5.txt")

count = table(trial$V2)

words = table(trial$V3)
words = sort(words, decreasing = T)

wordType = table(trial$V2)
wordType = sort(wordType, decreasing = T)

last = bag_o_words(trial$V1)
syll = sum(syllable_sum(last))


word = sum(wordType) - wordType["SENT"]
sent = wordType["SENT"]

level = 206.835 - 1.015*(word/sent) - 84.6*(syll/word)

grade = 0.39 * (word/sent) + 11.8 * (syll / word) - 15.59

cat(grade) #US grade level
cat(level) #ease of readability
