export default (code) => new Function('require', `
console.log('WORKED');
${code}`);