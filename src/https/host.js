if (process.env.NODE_TYPE === '1') { //测试http://10.9.21.94:8998/
    module.exports = "http://10.9.21.94:8998/"; // uat 10.1.49.55
} else if (process.env.NODE_TYPE === '0') {
    if (process.env.NODE_ENV === 'development') {
        module.exports = "http://10.9.21.94:8998/"; //研发http://10.9.21.36:8998/
    } else {
        module.exports = "http://10.9.21.96:8998/"; //生产
    }

}
//npm run  testing 测试包
//npm run  build 生产包