import request from 'supertest';
import server from '../index'; // Asegúrate de importar la instancia del servidor

afterAll(async () => {
  await server.close(); // Cierra el servidor después de todas las pruebas
});

describe('POST /api/files', () => {
  it('should upload a CSV file', async () => {
    // Ajusta la ruta del archivo CSV según la estructura de tu sistema de archivos
    const res = await request(server)
      .post('/api/files')
      .attach('file', 'F:/Pruebas tecnicas/Shaw and partners/backend/data/data.csv');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('The file was uploaded successfully');
  });
});

describe('GET /api/users', () => {
  it('should search through CSV data', async () => {
    // Ajusta el término de búsqueda para reflejar los datos en tu archivo CSV
    const res = await request(server)
      .get('/api/users?q=John');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0); // Asegúrate de que haya datos devueltos
  });
});
