import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1712725182604 implements MigrationInterface {
    name = 'FirstMigration1712725182604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`books\` (\`ID\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`availablity\` tinyint NOT NULL, \`year\` datetime NOT NULL, \`state\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`loans\` (\`ID\` varchar(36) NOT NULL, \`loan_date\` datetime NOT NULL, \`return_date\` datetime NOT NULL, \`expected_return_date\` datetime NOT NULL, \`state\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userID\` varchar(36) NULL, PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`ID\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`document_type\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`state\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`profileID\` int UNSIGNED NULL, PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`ID\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`state\` tinyint NOT NULL, \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`parameter_values\` (\`id_parameter\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`short\` varchar(255) NULL, \`state\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parameterID\` int NULL, PRIMARY KEY (\`id_parameter\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`parameters\` (\`ID\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_loans\` (\`booksID\` varchar(36) NOT NULL, \`loansID\` varchar(36) NOT NULL, INDEX \`IDX_8ff4211fe9ae1e713541cc5841\` (\`booksID\`), INDEX \`IDX_165b957408ba92faf129d0c943\` (\`loansID\`), PRIMARY KEY (\`booksID\`, \`loansID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`loans\` ADD CONSTRAINT \`FK_5e7cb150f43baeb82d9f0cfe0c0\` FOREIGN KEY (\`userID\`) REFERENCES \`users\`(\`ID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_d2486d8c81451cb8482d0400bf5\` FOREIGN KEY (\`profileID\`) REFERENCES \`profiles\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`parameter_values\` ADD CONSTRAINT \`FK_1c04370bfc68f284c4b5d2558d5\` FOREIGN KEY (\`parameterID\`) REFERENCES \`parameters\`(\`ID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_8ff4211fe9ae1e713541cc58416\` FOREIGN KEY (\`booksID\`) REFERENCES \`books\`(\`ID\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_loans\` ADD CONSTRAINT \`FK_165b957408ba92faf129d0c943c\` FOREIGN KEY (\`loansID\`) REFERENCES \`loans\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_165b957408ba92faf129d0c943c\``);
        await queryRunner.query(`ALTER TABLE \`book_loans\` DROP FOREIGN KEY \`FK_8ff4211fe9ae1e713541cc58416\``);
        await queryRunner.query(`ALTER TABLE \`parameter_values\` DROP FOREIGN KEY \`FK_1c04370bfc68f284c4b5d2558d5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_d2486d8c81451cb8482d0400bf5\``);
        await queryRunner.query(`ALTER TABLE \`loans\` DROP FOREIGN KEY \`FK_5e7cb150f43baeb82d9f0cfe0c0\``);
        await queryRunner.query(`DROP INDEX \`IDX_165b957408ba92faf129d0c943\` ON \`book_loans\``);
        await queryRunner.query(`DROP INDEX \`IDX_8ff4211fe9ae1e713541cc5841\` ON \`book_loans\``);
        await queryRunner.query(`DROP TABLE \`book_loans\``);
        await queryRunner.query(`DROP TABLE \`parameters\``);
        await queryRunner.query(`DROP TABLE \`parameter_values\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`loans\``);
        await queryRunner.query(`DROP TABLE \`books\``);
    }

}
