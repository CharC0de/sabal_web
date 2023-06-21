

export default function getLSValue(key) {

        const storedValue = localStorage.getItem(key);
        return JSON.parse(storedValue)

}
