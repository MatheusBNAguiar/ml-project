const flattenTexts = data => Object.values(data).reduce((accumulate,{text})=>{
    return [...accumulate,...text];
},[])

const flattenAttrs = data => Object.values(data).reduce((accumulate,{attr})=>{
    if(!attr){
        return accumulate
    }
    return [...accumulate,...attr];
},[])

const checkHomePage ={
    index: 'isHomePage',
    rule: ({ data: {title} }) => {
        if(!title){
            return 0;
        }
        const hasHomePage = title.find(({text}) => text.find(string=>string.match(/home\spage|Home\sPage|Homepage/gi)))
        return hasHomePage ?true : false;
    }
};

const hasProject ={
    index: 'hasProject',
    rule: ({ data: {title},url }) => {
        if(!title){
            return false;
        }
        const regexProject = /project/gi;
        const titleHasProject = title.filter(({text}) => text.find(string=>string.match(regexProject)))
        const urlHasProject = url.match(regexProject);
        return (urlHasProject || titleHasProject) ? true : false;
    }
};

const isMoved ={
    index: 'isMoved',
    rule: ({ data }) => {
        const {title}=data;
        if(!title){
            return 0;
        }
        const hasMoved = /move/gi;

        const texts = Object.values(data).reduce((accumulate,item)=>{
            return [...accumulate,...flattenTexts(item)];
        },[])
        const textHasMoved = texts.filter(string=>string.match(hasMoved)).length >=1

        const titleHasMoved = title.filter(({text}) => text.find(string=>string.match(hasMoved))).length >=1
        
        return (titleHasMoved ||  textHasMoved);
    }
};


const hasStudent ={
    index: 'hasStudent',
    rule: ({ data }) => {
        const texts = Object.values(data).reduce((accumulate,item)=>{
            return [...accumulate,...flattenTexts(item)];
        },[])
        const hasStudent = /graduate\sstudent|i\sam/gi;
        const titlehasStudent = texts.filter(string=>string.match(hasStudent))
        return titlehasStudent.length >1 ;
    }
};

const urlLevels ={
    index: 'urlLevels',
    rule: ({ url }) => {
        const urlLevel = url.split('^').filter(data=>data.length)
        return urlLevel.length > 1;
    }
};

const linksOnPage ={
    index: 'linksOnPage',
    rule: ({ data }) => {
        const texts = Object.values(data).reduce((accumulate,item)=>{
            return [...accumulate,...flattenAttrs(item)];
        },[])
        const hasStudent = /http/gi;
        const titlehasStudent = texts.filter(string=>string.match(hasStudent))
        return titlehasStudent.length >3;
    }
};

const hasProfessor ={
    index: 'hasProfessor',
    rule: ({ data }) => {
        const texts = Object.values(data).reduce((accumulate,item)=>{
            return [...accumulate,...flattenTexts(item)];
        },[])
        const hasStudent = /professor/gi;
        const titlehasStudent = texts.filter(string=>string.match(hasStudent))
        return titlehasStudent.length >1 ;
    }
};

const predefinedRules = [
    checkHomePage,
    hasProject,
    isMoved,
    hasProfessor,
    hasStudent,
    linksOnPage,
    urlLevels
]

function applyRules(dataObject) {
    for (const ruleObject of predefinedRules) {
        const {index, rule } = ruleObject;
        dataObject[index] = rule(dataObject);
    }
    return dataObject;
}

module.exports = {
    applyRules,
}