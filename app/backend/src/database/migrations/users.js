module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
                field: 'username',
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            role:{
                allowNull: false,
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, _Sequelize) => {
        await queryInterface.dropTable('users');
    }
};