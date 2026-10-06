import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/shop_db';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});


const Product = mongoose.model('Product', ProductSchema);

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Успешное подключение к MongoDB!');

    await Product.deleteMany({});
    console.log('Старые данные успешно очищены.');

    const initialProducts = [
      { name: 'Игровой ноутбук', price: 1200, inStock: true },
      { name: 'Беспроводная мышь', price: 25, inStock: true },
      { name: 'Механическая клавиатура', price: 85, inStock: false },
      { name: 'Монитор 27"', price: 300, inStock: true }
    ];

    await Product.insertMany(initialProducts);
    console.log('Новые товары успешно добавлены!');

    const products = await Product.find({});
    console.log('\nСписок товаров в базе данных:');
    console.log(products);

  } catch (error) {
    console.error('Ошибка при работе с базой данных:', error);
  } finally {
   
    await mongoose.disconnect();
    console.log('\nПодключение закрыто.');
    process.exit(0);
  }
}

main();