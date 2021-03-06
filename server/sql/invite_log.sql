﻿CREATE OR REPLACE FUNCTION log_new_invite()
RETURNS trigger AS
$BODY$
declare
sender_user_info RECORD;
receiver_user_info RECORD;
BEGIN

for receiver_user_info in 
select name from "Users" where emailid = NEW."receiverEmailid"
loop
end loop;

for sender_user_info in 
select name from "Users" where emailid = NEW."senderEmailid"
loop
end loop;

INSERT INTO "Notifications" ("senderEmailId", "senderName", "receiverEmailId", "receiverName", "notificationType", "notificationMeta1", "notificationMeta2", "status", "createdAt", "updatedAt")
VALUES(NEW."senderEmailid", sender_user_info.name, NEW."receiverEmailid" , receiver_user_info.name, 'Invite', 'New Invite',  'New Invite', 'Not Acknowledged', now(), now());


RETURN NEW;
END;
$BODY$

LANGUAGE plpgsql VOLATILE
COST 100;


CREATE TRIGGER log_invite
  AFTER INSERT
  ON "Invitations"
  FOR EACH ROW
  EXECUTE PROCEDURE log_new_invite();


INSERT INTO public."Invitations"(
             "senderEmailid", "receiverEmailid")
    VALUES ( 'gregory.pillai@gmail.com', 'bridget.pillai@gmail.com');

   select * from "Notifications" ;