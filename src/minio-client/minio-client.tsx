import * as Minio from 'minio';

export const minioClient = new Minio.Client({
    endPoint: '192.168.255.112',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'adminpass',
});
