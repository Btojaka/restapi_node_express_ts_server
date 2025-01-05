import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products", // table name decorator syntax
})

// The Product class extends the Model class from sequelize-typescript and defines the columns of the products table.
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;
  @Column({
    type: DataType.DECIMAL(10, 2), // DECIMAL type with 10 digits and 2 decimal places INSTEAD OF FLOAT type
    allowNull: false,
  })
  declare price: number;
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare availability: boolean;
}

export default Product;
