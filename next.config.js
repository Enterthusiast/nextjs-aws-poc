assetPrefix = '';
if(process.env.NODE_ENV !== 'development') {
    assetPrefix = '/default';
}

module.exports = {
    assetPrefix
}