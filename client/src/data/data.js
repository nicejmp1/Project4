// data.js
const context = require.context('../data/100/output_jsons', false, /\.json$/);
const ncsContext = require('./ncs/ncs.json');

console.log(ncsContext);

let data = [];

context.keys().forEach((key) => {
    const jsonData = context(key);
    const scholldata = jsonData.HRDNet?.srchList?.scn_list || [];

    const formattedData = scholldata.map(item => {
        // ncsCd에 해당하는 ncsContext의 타이틀 찾기
        const ncsItem = ncsContext.find(ncs => ncs.ncsCd === item.ncsCd) || {};

        return {
            title: item.title || 'No Title',
            sub: item.subTitle || 'No sub',
            address: item.address || 'No address',
            tell: item.telNo || 'No tell',
            StartDate: item.traStartDate || 'No start',
            EndDate: item.traEndDate || 'No End',
            yardMan: item.yardMan || 'No yard',
            ncsCd: item.ncsCd || 'No Code',
            ncsTitle: ncsItem.title || 'No NCS Title'  // ncsTitle 추가
        };
    });

    data = [...data, ...formattedData];
});

console.log(data);

export default data;
