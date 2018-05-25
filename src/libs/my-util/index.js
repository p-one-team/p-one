const _ut = (function() {
    const fixNum = function(num) {
        return num.toFixed(2)
    }

    const myfetch = async function(url, option) {
        const res = await fetch(url,option)
        if (!res.ok) {
            return Promise.reject(res)
        } 
        return res.json()
    }

    const isString = function(str) {
        return str instanceof String || (typeof str).toLowerCase() == "string";
    }
    
    return {
        fixNum,
        fetch: myfetch,
        isString
    }
})()

export default _ut