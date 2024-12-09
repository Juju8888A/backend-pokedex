// création d'un modèle sequelize
// j'exporte une fonction qui prend en paramètres, l'objet sequelize qui est la connexion à la bdd, dataTypes définit les types de données

const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
          msg:"Le nom est déjà pris"
        },
        validate: {
          notEmpty: { msg: "Veuillez renseigner un nom à votre pokémon." },
          notNull: { msg: "Les points de vie sont une propriété requise." },
          max: {
            args: [100],
            msg: "Il faut que le nombre soit inféieur ou égal à 100",
          },
          min: {
            args: [0],
            msg: "Il faut que le nombre soit inféieur ou égal à 0",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers" },
          notNull: { msg: "Les points de vie sont une propriété requise." },
        },
        max: {
          args: [100],
          msg: "Il faut que le nombre soit compris entre 0 et 100",
        },
        min: {
          args: [0],
          msg: "Il faut que le nombre soit inféieur ou égal à 0",
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers" },
          notNull: { msg: "Les points de dégats sont une propriété requise." },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Veuillez écrire une Url valide" },
          notNull: { msg: "L'image est une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypeValid(value) {
            if (!value) {
              throw new Error("Un pokemon doit au moins avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un pokemon ne pas avoir plus de trois types");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
