import request from './http';
const baseUrl = '/robot-configuration';
export const uploadFile = (data) =>
request({
  url: `${baseUrl}/api/file/uploadFile`,
  method: 'post',
  data,
});