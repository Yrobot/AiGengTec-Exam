const String = "奴隶社会,非洲,古埃及文明,金字塔\n,亚洲,两河流域文明,汉谟拉比法典\n,,古印度,种姓制度\n,,,佛教的创立\n,欧洲,希腊,希腊城邦\n,,,雅典民主\n,,罗马,城邦\n,,,帝国的征服与扩展\n,,希腊罗马古典文化,建筑艺术\n,,,公历";
// console.log(String.split('\n'));

Array.prototype.last = function () {
    if (this.length > 0)
        return this[this.length - 1];
    else
        return null
}

/**
 * @description 将单行命令转化为json数据 [单行命令格式:'xxx,xxx,xxx']
 * @author Yrobot
 * @date 2018-12-08
 * @param {*} cmd [单行命令格式:'xxx,xxx,xxx']
 * @returns 相应json数据
 */
function singleLine2Json(cmd) {
    const items = cmd.split(',');
    let res = [], temp = res;
    items.map(val => {
        let now = {};
        now[val] = [];
        temp.push(now);
        temp = now[val];
    });
    return res;
}
 
/**
 * @description 根据','的数量获取相应位置的array
 * @author Yrobot
 * @date 2018-12-08
 * @param {*} nowArray 整体array
 * @param {*} index 层级
 * @returns 相应位置的array
 */
function go2ArrayByIndex(nowArray, index) {
    let tempArray = nowArray;
    if (index > 0) {
        for (let i = 0; i < index; i++) {
            if (tempArray.length > 0) {
                tempArray = getNextArray(tempArray);
            } else {
                console.error("tempArray.length = 0");
                break;
            }
        }
    }
    return tempArray
}

/**
 * @description  获取下一层array的索引 [有并行存在时，取最后一个]
 * @author Yrobot
 * @date 2018-12-08
 * @param {*} tempArray 传入的整体array
 * @returns 下一层array的索引
 */
function getNextArray(tempArray) {
    return Object.values(tempArray.last()).last();
}


function str2json(str) {
    //my code
    let CMDlist = str.split('\n');
    let res = singleLine2Json(CMDlist[0]);
    for (let i = 1; i < CMDlist.length; i++) {
        if (/^,{3}/.test(CMDlist[i])) {
            go2ArrayByIndex(res, 3).push(...singleLine2Json(CMDlist[i].slice(3)))
        }
        else if (/^,{2}/.test(CMDlist[i])) {
            go2ArrayByIndex(res, 2).push(...singleLine2Json(CMDlist[i].slice(2)))
        }
        else if (/^,{1}/.test(CMDlist[i])) {
            go2ArrayByIndex(res, 1).push(...singleLine2Json(CMDlist[i].slice(1)))
        }
    }
    return res.last();
}

console.log(str2json(String));
