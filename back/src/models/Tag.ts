import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TagAttributes {
  id: number;
  titre: string;
  color: string;
  project_id: number;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'id'> {}

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
  public id!: number;
  public titre!: string;
  public color!: string;
  public project_id!: number;
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Projects',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
  }
);


export default Tag;
