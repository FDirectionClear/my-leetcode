// 返回一个可以给每一个fn传递props参数的，promise链生成器

/**
 * 两种都没有经过验证，但是看上去应该是可行的
 */
function chainPromise1(fns) {
    return fns.reduce((p, currFn) => p.then((res) => currFn(res)), Promise.resolve(res))
}

function chainPromise2(fns, initValue) {
    let p = Promise.resolve(initValue)
    
    while(fns.length) {
        const fn = fns.shift()
        p = p.then((res) => fn(res))
    }

    return p
}


