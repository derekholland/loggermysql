-- DropForeignKey
ALTER TABLE `exercise` DROP FOREIGN KEY `Exercise_workoutId_fkey`;

-- DropForeignKey
ALTER TABLE `set` DROP FOREIGN KEY `Set_exerciseId_fkey`;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
