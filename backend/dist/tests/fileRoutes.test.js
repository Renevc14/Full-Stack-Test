"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Asegúrate de importar la instancia del servidor
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.close(); // Cierra el servidor después de todas las pruebas
}));
describe('POST /api/files', () => {
    it('should upload a CSV file', () => __awaiter(void 0, void 0, void 0, function* () {
        // Ajusta la ruta del archivo CSV según la estructura de tu sistema de archivos
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/files')
            .attach('file', 'F:/Pruebas tecnicas/Shaw and partners/backend/data/data.csv');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('The file was uploaded successfully');
    }));
});
describe('GET /api/users', () => {
    it('should search through CSV data', () => __awaiter(void 0, void 0, void 0, function* () {
        // Ajusta el término de búsqueda para reflejar los datos en tu archivo CSV
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/users?q=John');
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0); // Asegúrate de que haya datos devueltos
    }));
});
