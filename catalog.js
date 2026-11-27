// These are editorial summaries. Questions are written for the reader.
export const people = {
 gates:["Bill Gates","Gates took leave from Harvard to build a software business, returning for two terms in 1976.","Harvard Gazette · Dawn of a revolution","https://news.harvard.edu/gazette/story/2013/09/dawn-of-a-revolution/"],
 jobs:["Steve Jobs","After leaving Reed College, Jobs stayed on to audit classes. A calligraphy course was among the ones he chose.","Stanford · 2005 commencement address","https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says"],
 curie:["Marie Curie","Curie worked as a governess and helped fund her sister’s education before moving to Paris to study.","Nobel Prize · Marie and Pierre Curie","https://www.nobelprize.org/prizes/themes/marie-and-pierre-curie-and-the-discovery-of-polonium-and-radium/"],
 burry:["Michael Burry","Burry studied medicine and invested in his spare time during his residency. He left medical training and started an investment fund in 2000.","Michael Lewis · The Big Short"],
 kim:["Kim Gu","At seventeen, Kim sat for the civil service examination. In his memoir he described the corruption he saw and his decision to leave that path.","Kim Gu · Baekbeom Ilji"],
 confucius:["Confucius","Confucius travelled across states seeking a place to put his ideas into practice. Teaching continued through those years.","The Analects"],
 jeong:["Jeong Yak-yong","During eighteen years of exile in Gangjin, Jeong wrote extensively and continued teaching his sons through letters.","Letters from Exile · Admonitions on Governing the People"],
 buffett:["Warren Buffett","After working in New York, Buffett returned to Omaha in 1956 and started an investment partnership there.","Alice Schroeder · The Snowball"],
 franklin:["Benjamin Franklin","Franklin learned printing as an apprentice in Boston. At seventeen he left for Philadelphia and sought work in the trade.","The Autobiography of Benjamin Franklin"],
 bezos:["Jeff Bezos","Bezos left a finance job to start an online bookstore. He later described imagining which decision he might regret at eighty.","Academy of Achievement · 2001 interview"],
 yi:["Yi Sun-sin","Yi fell from his horse during a military examination. Four years later he passed at age thirty-two.","Yi Sun-sin · biographical chronology"],
 nightingale:["Florence Nightingale","Despite years of family opposition, Nightingale sought nursing training in Germany as an adult.","Florence Nightingale · correspondence"],
 huang:["Jensen Huang","Huang worked in a diner as a teenager. Years later, he and his co-founders met in a diner to plan a chip company.","NVIDIA · company history and interviews"]
};
export const topics = [
 ["leave","Should I take a semester off?","semester off|gap year|take a break|leave school|time off|drop out",[
 ["gates","Leave a way back","When could I return, and what paperwork would I need?"],
 ["jobs","Keep one class","Which class or activity would I miss enough to keep doing?"],
 ["curie","Work first, study later","What would a semester of work let me afford?"]]],
 ["major","I think I chose the wrong major.","major|degree|switch courses",[
 ["burry","Try a second field","Could I try one assignment in the other field before switching?"],
 ["kim","Look at the institution","Is the subject wrong for me, or is it the environment?"],
 ["confucius","Notice what lasts","Which parts would I keep doing outside the course?"]]],
 ["move","Should I move away for work?","relocate|move away|move to|big city|hometown",[
 ["jeong","Stay in touch","Which people would help me stay connected after a move?"],
 ["buffett","Work from home ground","Who could I work with where I live now?"],
 ["franklin","Take a skill along","Which skill would help me find my first week of work?"]]],
 ["path","Work, graduate school, or another exam?","grad school|graduate school|job or|exam|career path",[
 ["bezos","Consider the missed chance","Which opportunity has an actual deadline?"],
 ["yi","Count the cost of a retry","What would another round of preparation take?"],
 ["curie","Choose the order","Which option could cover the cost of the next one?"]]],
 ["parents","My family wants a different future.","parents|family|mother|father",[
 ["nightingale","Try the work","Could someone in the field show me a normal working day?"],
 ["confucius","Reopen the conversation","What concern would I like my family to explain first?"],
 ["jobs","Name the expense","What would this choice cost and who would carry it?"]]],
 ["late","Everyone seems ahead of me.","behind|too late|falling behind|my age",[
 ["yi","Measure the next attempt","What would count as progress before my next try?"],
 ["curie","Account for paid work","Which responsibilities have shaped my timetable?"],
 ["jeong","Use the time available","What could I finish with the time I have this week?"]]],
 ["fail","I got turned down. Try again?","rejected|rejection|turned down|failed|retry",[
 ["buffett","Find the teacher elsewhere","Who else could teach the thing I applied to learn?","After Harvard Business School turned him down, Buffett studied with Benjamin Graham at Columbia."],
 ["yi","Prepare for another try","What exactly would I practise differently?"],
 ["kim","Reconsider the route","Would reaching this goal still be worth another attempt?"]]],
 ["lost","I have no idea what I want.","no idea|lost|no direction|unsure|what i want",[
 ["huang","Start where you are","Who could tell me how they got from a first job to the next?"],
 ["jobs","Follow a small interest","Which class would I attend even without a grade?"],
 ["franklin","Learn beside someone","Whose work could I shadow for an afternoon?"]]]
];
export function suggest(text) {
 const normalized=text.toLowerCase();
 const ranked=topics.map(([id,,terms])=>[id,terms.split('|').filter(term=>normalized.includes(term)).length]);
 const best=Math.max(...ranked.map(row=>row[1]));
 return best ? ranked.filter(row=>row[1]===best).map(row=>row[0]) : [];
}
