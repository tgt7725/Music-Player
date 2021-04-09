export default function getDataList (url) {
    return fetch(url).then(resp => resp.json());
}

