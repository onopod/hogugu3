-- AlterTable
CREATE SEQUENCE photo_id_seq;
ALTER TABLE "Photo" ALTER COLUMN "id" SET DEFAULT nextval('photo_id_seq');
ALTER SEQUENCE photo_id_seq OWNED BY "Photo"."id";
