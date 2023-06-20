Register -> usrr_info -> save_in_database

Register -> usrr_info -> password (hash & salt) -> hash is in db

___

Login -> incoming_info (compare with saved info) -> yes login allowed -> no login failed

Login -> incoming_info -> password (plain text) -> compare (with salt) and hash saved in db -> yes or no

___

Update/todo (potected)
