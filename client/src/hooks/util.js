export function objectArray (array) {
    let body = Object.entries(array);
    let obj = [];
    let temp = [];
    let index = 0;
    for (let i = 0; i < body.length; i++) {
        if (body[i][0].slice(-(Math.floor(index / 10))) != index) {
            obj.push(Object.fromEntries(temp));
            temp = [];
            index ++;
        }
        temp.push([body[i][0].slice(0, -1), body[i][1]])
    }
    obj.push(Object.fromEntries(temp));   
}

export function arrayObject(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = Object.entries(arr[i])
        temp.forEach(element => element[0] += i);
        out = out.concat(temp)
    }
    out = Object.fromEntries(out);
    return out;
}

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


