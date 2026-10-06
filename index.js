import mongoose from 'mongoose';

// 1. Подключение к локальной базе данных MongoDB (база shop_db)
const MONGO_URI = 'mongodb://127.0.0.1:27017/shop_db';

// 2. Создание схемы для товара (ProductSchema)
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});

// 3. Создание модели с именем "Product"
const Product = mongoose.model('Product', ProductSchema);

// 4. Асинхронная функция для выполнения операций
async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Успешное подключение к MongoDB!');

    // Очистка старых данных
    await Product.deleteMany({});
    console.log('Старые данные успешно очищены.');

    // Добавление минимум 4 разных товаров с помощью insertMany
    const initialProducts = [
      { name: 'Игровой ноутбук', price: 1200, inStock: true },
      { name: 'Беспроводная мышь', price: 25, inStock: true },
      { name: 'Механическая клавиатура', price: 85, inStock: false },
      { name: 'Монитор 27"', price: 300, inStock: true }
    ];

    await Product.insertMany(initialProducts);
    console.log('Новые товары успешно добавлены!');

    // Нахождение и вывод в консоль всех товаров из базы
    const products = await Product.find({});
    console.log('\nСписок товаров в базе данных:');
    console.log(products);

  } catch (error) {
    console.error('Ошибка при работе с базой данных:', error);
  } finally {
    // Завершение работы процесса
    await mongoose.disconnect();
    console.log('\nПодключение закрыто.');
    process.exit(0);
  }
}

main();