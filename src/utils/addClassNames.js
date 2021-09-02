export default function addClassNames(basicClassName, ...classNames) {
    return [basicClassName, ...classNames].join(' ');
}