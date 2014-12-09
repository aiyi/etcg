var validator = require('validator');

module.exports = function(Rsu) {
  var isStatic = true;
  Rsu.disableRemoteMethod('create', isStatic);
  Rsu.disableRemoteMethod('upsert', isStatic);
  Rsu.disableRemoteMethod('exists', isStatic);
  Rsu.disableRemoteMethod('find', isStatic);
  Rsu.disableRemoteMethod('findOne', isStatic);
  Rsu.disableRemoteMethod('findById', isStatic);
  Rsu.disableRemoteMethod('count', isStatic);
  Rsu.disableRemoteMethod('deleteById', isStatic);
  Rsu.disableRemoteMethod('updateAttributes', false);
  Rsu.disableRemoteMethod('updateAll', isStatic);
  
  Rsu.queryPara = function(ip, cb) {
    if (!validator.isIP(ip, 4))
      return cb(new Error('IP: xxx.xxx.xxx.xxx'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      cb(null, rsu);
    });
  }

  Rsu.remoteMethod('queryPara', {
    description: '查询RSU全部工作参数',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'}
    ],
    returns: {arg: 'RSU', type: 'rsu', root: true},
    http: {verb: 'get'}
  });
  
  Rsu.closeAnt = function(ip, cb) {
    if (!validator.isIP(ip))
      return cb(new Error('IP: xxx.xxx.xxx.xxx'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      //rsu.updateAttributes({Status: 2}, function(err, obj) {
      //    if (err) return cb(err);
          return cb(null, true);
      //  });
    });
  }

  Rsu.remoteMethod('closeAnt', {
    description: '关闭天线',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'}
  });
  
  Rsu.openAnt = function(ip, cb) {
    if (!validator.isIP(ip, 4))
      return cb(new Error('IP: xxx.xxx.xxx.xxx'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      //rsu.updateAttributes({Status: 0}, function(err, obj) {
      //    if (err) return cb(err);
          return cb(null, true);
      //  });
    });
  }

  Rsu.remoteMethod('openAnt', {
    description: '打开天线',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'}
  });
  
  Rsu.setStaRd = function(ip, sta, rd, cb) {
    if (!validator.isIP(ip, 4))
      return cb(new Error("IP: xxx.xxx.xxx.xxx"));
    if (sta < 0 || sta > 65535)
      return cb(new Error('Station: 0~65535'));
    if (rd < 0 || rd > 255)
      return cb(new Error('Roadway: 0~255'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      rsu.updateAttributes({Station: sta, Roadway: rd}, function(err, obj) {
          if (err) return cb(err);
          return cb(null, true);
        });
    });
  }

  Rsu.remoteMethod('setStaRd', {
    description: '设置站点号和车道号',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'},
      {arg: 'Station', type: 'number', required: true, description: '站点号(0~65535)'},
      {arg: 'Roadway', type: 'number', required: true, description: '车道号(0~255)'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'}
  });

  Rsu.setStatus = function(ip, status, cb) {
    if (!validator.isIP(ip, 4))
      return cb(new Error("IP: xxx.xxx.xxx.xxx"));
    if (status !== 0 && status != 2)
      return cb(new Error('Status: 0,2'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      rsu.updateAttributes({Status: status}, function(err, obj) {
          if (err) return cb(err);
          return cb(null, true);
        });
    });
  }

  Rsu.remoteMethod('setStatus', {
    description: '设置RSU工作状态',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'},
      {arg: 'Status', type: 'number', required: true, description: '工作状态(0:正常,2:热备)'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'}
  });
  
  Rsu.setTxPower = function(ip, tx, cb) {
    if (!validator.isIP(ip, 4))
      return cb(new Error("IP: xxx.xxx.xxx.xxx"));
    if (tx < 0 || tx > 31)
      return cb(new Error('TxPower: 0~31'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      rsu.updateAttributes({TxPower: tx}, function(err, obj) {
          if (err) return cb(err);
          return cb(null, true);
        });
    });
  }

  Rsu.remoteMethod('setTxPower', {
    description: '设置RSU发射功率级数',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'},
      {arg: 'TxPower', type: 'number', required: true, description: '发射功率级数(0~31)'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'}
  });
  
  Rsu.setRxSensi = function(ip, rx, cb) {
    if (!validator.isIP(ip, 4))
      return cb(new Error("IP: xxx.xxx.xxx.xxx"));
    if (rx < 0 || rx > 31)
      return cb(new Error('RxSensitivity: 0~31'));
    Rsu.findById(ip, function(err, rsu) {
      if (err) return cb(err);
      if (!rsu) return cb(new Error('RSU not found: ' + ip));
      rsu.updateAttributes({RxSensitivity: rx}, function(err, obj) {
          if (err) return cb(err);
          return cb(null, true);
        });
    });
  }

  Rsu.remoteMethod('setRxSensi', {
    description: '设置RSU接收灵敏度',
    accepts: [
      {arg: 'IP', type: 'string', required: true, description: 'IP地址'},
      {arg: 'RxSensitivity', type: 'number', required: true, description: '接收灵敏度(0~31)'}
    ],
    returns: {arg: 'success', type: 'boolean'},
    http: {verb: 'post'}
  });
};
