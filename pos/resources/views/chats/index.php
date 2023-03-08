<section class="container">
    <div class="main-wrapper d-flex">
        <div class="row">
            <div class="col-xl-4 users-list">
                <div class="card-body">
                    <div class="user-list-box">
                        <ul id="user_for_chat" class="list-group">
                            <li class="list-group-item user_in_session d-flex align-items-center">
                                <div class="col-3">
                                    <img src="./resources/image/<?=$_SESSION['user']['image']?>" width="100%"
                                        height="100%" style="border-radius: 50%;" />
                                </div>
                                <div class="col-9 ms-2">
                                    <p class="mb-0 ms-1"><?=$_SESSION['user']['username']?>
                                    <p>
                                        <i class='fa fa-circle me-1'></i><span>Active now</span>
                                </div>
                            </li>
                    </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-xl-8">
            <div class="right-panel mb-4">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-start" id="msg-header-user">
                        <?php if (!empty($data->user)): ?>
                        <li class="list-group-item  d-flex align-items-center">
                            <div class="col-2">
                                <img src="./resources/image/<?=$data->user->image?>" width="100%" height="100%"
                                    style="border-radius: 50%;" />
                            </div>
                            <div class="">
                                <p class="mb-0 ms-1"><?=$data->user->username?></p>
                                <?php if ($data->user->online == "1"): ?>
                                <i class='fa fa-circle me-1'></i><span>online</span>
                                <?php else: ?>
                                <i class='fa fa-circle offline me-1'></i><span>offline</span>
                                <?php endif; ?>
                            </div>
                        </li>
                        <?php else: ?>
                        <p class="mb-0 ms-1">Welcome to chatbox</p>
                        <?php endif; ?>

                        <div class="message-to d-flex ">

                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chat-wrapper">
                            <div class="chat-body">
                                <div id="chat_load">
                                    <?php if (!empty($data->chat)): ?>
                                    <?php foreach ($data->chat as $value) : ?>
                                    <?php if($value->sender_username == $_SESSION['user']['username']):?>
                                    <div id="chat_user" class=" mb-2 " style='text-align:left;'>
                                        <img class="image_chat" src="./resources/image/<?=$value->sender_image?>"
                                        width='7%' height="7%">
                                            <span class="ms-2 user"><?=$value->message?></span>
                                            <p style='display:none;'><?=$value->created_at?></p>
                                    </div>
                                    <?php else: ?>
                                    <div id="chat_receiver" class="  mb-2 " style='text-align:right;'>
                                        <img class="image_chat " src="./resources/image/<?=$value->sender_image?>"
                                            width='7%' height="7%">
                                        
                                            <span class="ms-2 receiver"><?=$value->message?></span>
                                            <p style='display:none;'><?=$value->created_at?></p>
                                        
                                    </div>
                                    <?php endif; ?>
                                    <?php endforeach; ?>
                                    <?php endif; ?>
                                    <?php date('d/m/y')?>
                                </div>

                            </div>
                            <div class="type-chats">
                                <form id="sending_msg">
                                <input type="hidden" id="my_problem" value=<?=$_GET['receiver_id']?> >
                                    <textarea id="message" style="resize:none;" placeholder="Type Message..."
                                        class="form-control mb-3"></textarea>
                                    <button type="submit" class="btn btn-sm btn-primary text-light "> <i
                                            class="fa-solid fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</section>