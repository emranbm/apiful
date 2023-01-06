import {DependencyList, useEffect} from "react"

function _useEffectAsync(asyncFunc: (this: any) => void, deps: DependencyList, thisArg: any) {
    useEffect(() => {
        asyncFunc.apply(thisArg)
    }, deps)
}

export default abstract class GeneralUtils {
    static convertNumberToCommaSeparatedStr(num: number) {
        const str = num.toString()
        let result = ""
        for (let i = 0; i < str.length; i++) {
            result = str[str.length - i - 1] + result
            if (i % 3 === 2 && i !== str.length - 1)
                result = "," + result
        }
        return result
    }

    static isDev() {
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    }

    static useEffectAsync(asyncFunc: (this: any) => void,
                          deps: DependencyList = [],
                          thisArg: any = {}) {
        _useEffectAsync.apply(this, [asyncFunc, deps, thisArg])
    }
}
