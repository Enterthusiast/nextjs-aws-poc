const environment = {
  // You can get a key here https://dev.battle.net/
  wow_api_key: ''
}

// url change from dev to aws lambda environment
// we need to add a prefix
environment.link_prefix = '';
if(process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    environment.link_prefix = '/default';
}

export default environment