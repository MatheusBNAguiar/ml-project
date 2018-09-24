const { getFlattenText, getFlattenAttrs } = require('./utils');
const { getPeopleOnText } = require('./pnl');

module.exports = {
    /**
     * Auxiliar rules
     */

    _hasFaculty: ({ url }) => /faculty/gi.test(url),

    _hasCourseLabelUrl: ({ url }) => /cs[0-9]*/gi.test(url),

    _hasCourseLabelPNL: ({ pnl }) => (Object.keys(pnl).filter(key => key.match(/cs[0-9]*/)).length > 0),

    _hasDepartment: ({ data: { title } }) => {
        if (!title) {
            return false;
        }
        return title.filter(({ text }) => text.find(string => string.match(/dea|department/gi))).length > 0;
    },

    /**
     * Main rules
     */

    uniqueWordOnText: ({ pnl }) => (Object.keys(pnl).length > 30 ? 30 : Object.keys(pnl).length),

    hasBigText: ({ groupedText }) => groupedText.length > 10000,

    hasCourseWritten: ({ pnl }) => (Object.keys(pnl).filter(key => key.match(/course/)).length > 0),

    hasUserOnUrl: ({ url }) => ((url.match(/user|edu\^u\^/gi) || []).length > 0),

    hasEducationOnUrl: ({ url }) => ((url.match(/education|\^edu\^/gi) || []).length > 0),

    hasResearchOnUrl: ({ url }) => (url.match(/research|project\^Brochure|hyplan/gi) || []).length > 0,

    hasCourseRelatedData: ({ url }) => /courses|course_home_pages|classes|class\^cs/gi.test(url),

    hasStaffOnUrl: ({ url }) => /\^staff\^/gi.test(url),

    isMovedPermanently: ({ groupedText }) => /Moved Permanently/gi.test(groupedText),

    urlLevels: ({ url }) => url.split('^').filter(Boolean).length,

    hasJustMainUrl: ({ url }) => !url.replace(/ftp_\^\^/g)
        .split(/\^/g)
        .filter(Boolean).slice(1)
        .pop(),

    hasMoreThenTwoLinks: ({ data }) => {
        const attrs = getFlattenAttrs(data);
        const hasStudent = /http/gi;
        const titlehasStudent = attrs.filter(string => string.match(hasStudent));
        return titlehasStudent.length > 2;
    },

    isHomePage: ({ data: { title } }) => {
        if (!title) {
            return false;
        }
        return title.filter(({ text }) => text.find(string => string.match(/home\spage|Home\sPage|Homepage/gi))).length > 0;
    },

    hasProject: ({ data: { title }, url }) => {
        if (!title) {
            return false;
        }
        const regexProject = /project/gi;
        const regexGroup = /group/gi;
        const regexResearch = /research/gi;


        const titleHasProject = title
            .filter(({ text }) => text.find(string => string.match(regexProject))).length > 0;

        const urlHasProject = regexProject.test(url);
        const urlHasGroup = regexGroup.test(url);
        const urlHasResearch = regexResearch.test(url);

        const hasGroupAndProject = urlHasProject && urlHasGroup;
        const hasResearchAndProject = urlHasProject && urlHasResearch;
        const hasGroupAndResearch = urlHasGroup && urlHasResearch;

        return (hasGroupAndProject || hasResearchAndProject ||
            hasGroupAndResearch || (urlHasProject && titleHasProject));
    },

    hasProfessor: ({ data }) => {
        const texts = getFlattenText(data);
        const hasStudent = /professor/gi;
        const titlehasStudent = texts.filter(string => string.match(hasStudent));
        return titlehasStudent.length >= 1;
    },


    hasStudent: ({ data }) => {
        const texts = getFlattenText(data);
        const hasStudent = /graduate\student|i\sam/gi;
        const titlehasStudent = texts.filter(string => string.match(hasStudent));
        return titlehasStudent.length > 1;
    },

    hasPeopleName: ({ data: { title } }) => {
        if (!title) {
            return false;
        }
        return title.filter(({ text }) => text
            .find(string => getPeopleOnText(string).length)).length > 0;
    },

    hasPeopleNameOnText: ({ pnl }) => {
        const keys = Object.keys(pnl);
        if (!keys.length) {
            return 0;
        }
        const total = getPeopleOnText(keys.join(' '));
        return total.length;
    },

    /**
     * Matched rules
     */

    hasStudentAndPeopleNameONT: data => data.hasPeopleName && data.hasStudent,

    hasProfessorAndPeopleNameONT: data => data.hasPeopleName && data.hasProfessor,

    isDepartment: data => data.hasJustMainUrl && data._hasDepartment,

    isCourse: data => data._hasFaculty && data._hasCourseLabelUrl,
};

