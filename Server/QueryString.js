module.exports ={

    //#region 회원관리 SQL 목록
      // 댓글 수정
      handleMemberUpdatePassword : `
      UPDATE USER_INFO
      SET USER_PW = ?
      WHERE USER_ID = ?
      `,
  
    //사용자 아이디 조회
    handleSelectFindUserId : `
    SELECT * FROM USER_INFO
    WHERE USER_NAME=?
    AND EMAIL_ADDRESS=?
    `,
    handleSelectFindUserPw : `
    SELECT * FROM USER_INFO
    WHERE USER_NAME=?
    AND EMAIL_ADDRESS=?
    `,
    // 사용자 조회
    handleSelectUserInfo : `
    SELECT USER_ID,USER_PW,USER_NAME,USER_CLASS,GENDER,EMAIL_ADDRESS ,'DEX' as SALT FROM SKYNET.USER_INFO
    WHERE USER_ID=? 
    `,

    // 회원가입
    handleInsertMember : `
    INSERT INTO SKYNET.USER_INFO
    (
        USER_ID
      , USER_PW
      , USER_NAME
      , DATE_OF_BIRTH
      , EMAIL_ADDRESS
      , GENDER
    )
    VALUES
    (
      ?
      , ?
      , ?
      , ?
      , ?
      , ?
    )
    `,

    handleReadProfile : `
    SELECT FILE_NAME
    FROM SKYNET.USER_PROFILE
    WHERE USER_ID = ?
    ORDER BY CREATE_TIME DESC
    LIMIT 1
    `,
    // 프로필 사진 추가
    handleProfileChange :`
    INSERT INTO USER_PROFILE
    (
        USER_ID
      , FILE_NAME
    )
    VALUES
    (
        ?
      , ?
    )
    `,
    
    //#endregion 회원관리 SQL 목록

    //#region 댓글 작업

    // 댓글 수정
    handelUpdateFreeComment : `
    UPDATE NOTICE_COMMENT
    SET CONTENTS = ?
      , LAST_UPDATE_TIME = NOW()
      , MODIFY_FLAG = 'Y'
    WHERE COMMENT_NUM = ?
    `,

    //#endregion 댓글 작업

    //#region 사진게시판 SQL 목록
    
    // 사진 목록 (Home 화면 전용)
    handleGetFeedPhoto : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath FROM skynet.photo_board order by pix_num desc limit 6
    `,

    // 사진전체조회 (진짜 게시글 목록)
    handleGetAllFeedPhoto_ORG : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.photo_board order by pix_num desc
    `,
    
    // 사용자 사진 조회 (진짜 게시글 목록)
    handleGetFeedPhoto_ORG : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.photo_board
    WHERE pix_owner = ?
    order by pix_num desc
    `,
    // 사용자 사진 조회 (진짜 게시글 목록)
    handleGetDevPhoto_ORG : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.portfolio_developer
    WHERE pix_owner = ?
    order by pix_num desc
    `,
     // 사용자 사진 조회 (진짜 게시글 목록)
     handleGetMdlPhoto_ORG : `
     SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.portfolio_modeler
     WHERE pix_owner = ?
     order by pix_num desc
     `,
    // 사용자 사진 조회 (진짜 게시글 목록)
    handleGetDgnPhoto_ORG : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.portfolio_designer
    WHERE pix_owner = ?
    order by pix_num desc
    `,
    // 사용자 사진 조회 (진짜 게시글 목록)
    handleGetIfaPhoto_ORG : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.portfolio_infra
    WHERE pix_owner = ?
    order by pix_num desc
    `,
    // 사용자 사진 조회 (진짜 게시글 목록)
    handleGetMediaPhoto_ORG : `
    SELECT pix_num,pix_owner,pix_path,pix_filename,pix_loadPath,pix_contents FROM skynet.portfolio_media
    WHERE pix_owner = ?
    order by pix_num desc
    `,
    //사진업로드
    handleInsertPhoto : `
    INSERT INTO SKYNET.photo_board
    (
      pix_num
    , pix_owner
    , pix_path
    , pix_filename
    , pix_loadPath
    , pix_contents
    )
    VALUES
    (
    (SELECT IFNULL(MAX(pix_num) + 1, 1) FROM photo_board B)
    , ?
    , ?
    , ?
    , ?
    , ?
    )
    `,
//파일첨부
handleInsertAttachFile : `
INSERT INTO SKYNET.attach_board
(
  pix_num
, pix_owner
, pix_path
, pix_filename
, pix_loadPath
, pix_contents
)
VALUES
(
(SELECT IFNULL(MAX(pix_num) + 1, 1) FROM attach_board B)
, ?
, ?
, ?
, ?
, ?
)
`,

handleInsertDeveloperFile : `
INSERT INTO SKYNET.portfolio_developer
(
  pix_num
, pix_owner
, pix_path
, pix_filename
, pix_loadPath
, pix_contents
)
VALUES
(
(SELECT IFNULL(MAX(pix_num) + 1, 1) FROM portfolio_developer B)
, ?
, ?
, ?
, ?
, ?
)
`,
handleInsertModelerFile : `
INSERT INTO SKYNET.portfolio_modeler
(
  pix_num
, pix_owner
, pix_path
, pix_filename
, pix_loadPath
, pix_contents
)
VALUES
(
(SELECT IFNULL(MAX(pix_num) + 1, 1) FROM portfolio_modeler B)
, ?
, ?
, ?
, ?
, ?
)
`,
handleInsertDesignerFile : `
INSERT INTO SKYNET.portfolio_designer
(
  pix_num
, pix_owner
, pix_path
, pix_filename
, pix_loadPath
, pix_contents
)
VALUES
(
(SELECT IFNULL(MAX(pix_num) + 1, 1) FROM portfolio_designer B)
, ?
, ?
, ?
, ?
, ?
)
`,
handleInsertInfraFile : `
INSERT INTO SKYNET.portfolio_infra
(
  pix_num
, pix_owner
, pix_path
, pix_filename
, pix_loadPath
, pix_contents
)
VALUES
(
(SELECT IFNULL(MAX(pix_num) + 1, 1) FROM portfolio_infra B)
, ?
, ?
, ?
, ?
, ?
)
`,
handleInsertMediaFile : `
INSERT INTO SKYNET.portfolio_media
(
  pix_num
, pix_owner
, pix_path
, pix_filename
, pix_loadPath
, pix_contents
)
VALUES
(
(SELECT IFNULL(MAX(pix_num) + 1, 1) FROM portfolio_media B)
, ?
, ?
, ?
, ?
, ?
)
`,

    // 사진 게시판 댓글 목록
    handleReadPhotoComments : `
    SELECT CONTENTS
         , USER_ID
         , USER_NAME
         , COMMENT_NUM
         , NOTICE_NAME
         , NOTICE_NUM
         , PARENTS_COMMENT_NUM
         , MODIFY_FLAG
         , DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s') AS CREATE_TIME
    FROM SKYNET.NOTICE_COMMENT
    WHERE USE_FLAG = 'Y'
    AND NOTICE_NAME = 'PHOTO'
    AND NOTICE_NUM = ?
    `,

    // 사진 게시판 댓글 등록
    handleInsertPhotoComment : `
    INSERT INTO SKYNET.NOTICE_COMMENT
    (
        COMMENT_NUM
      , PARENTS_COMMENT_NUM
      , NOTICE_NAME
      , NOTICE_NUM
      , USER_ID
      , USER_NAME
      , CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('COMMENT') FROM DUAL)
      , NULL
      , 'PHOTO'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 사진 게시판  댓글 삭제
    handleDeletePhotoComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,

    //#endregion 사진게시판 SQL 목록

    //#region 자유게시판 SQL 목록
    
    // 자유게시판 게시글 목록 (Home 화면 전용)
    handleSelectFreeBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.NOTICE_FREE
    ORDER BY NUM DESC LIMIT 6
    `,

    // 자유게시판 게시글 목록 (진짜 게시글 목록)
    handleSelectFreeBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.NOTICE_FREE
    ORDER BY NUM DESC
    `,

    // 자유게시판 페이지 게시글 목록
    handleSelectFreeBoardPage : `
    SELECT PAGELIST.ROWNUM
          ,PAGELIST.NUM 
          ,PAGELIST.NOTICE_NAME
          ,PAGELIST.NOTICE_TITLE
          ,PAGELIST.NOTICE_CONTENTS
          ,PAGELIST.SEARCH_COUNT
    FROM (SELECT ROW_NUMBER() OVER ( ORDER BY NUM DESC) as ROWNUM
              , NUM
              , NOTICE_NAME
              , NOTICE_TITLE
              , NOTICE_CONTENTS
              , SEARCH_COUNT
          FROM SKYNET.NOTICE_FREE BOARD
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,
    
    // 자유게시판 페이지 목록
    handleSelectFreeBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
        , IF(MOD(TOTAL.TOTALITEM,10)=0 
        , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE
    FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM
        FROM SKYNET.NOTICE_FREE BOARD
            , (SELECT @ROWNUM:=0) ROWNUM
        ) TOTAL
    `,

    // 자유게시판 게시글 추가
    handleInsertFreeBoard : `
    INSERT INTO NOTICE_FREE
    (
      NUM
    , NOTICE_ID
    , NOTICE_NAME
    , NOTICE_TITLE
    , NOTICE_CONTENTS
    )
    VALUES
    (
      (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
    , ?
    , ?
    , ?
    , ?
    )`,

    // 자유게시판 게시글 삭제
    handleDeleteFreeBoard : `
    DELETE FROM NOTICE_FREE
    WHERE NUM = ?
    `,
    
    // 자유게시판 게시글 수정
    handleUpdateFreeBoard : `
    UPDATE SKYNET.NOTICE_FREE
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
    WHERE NUM = ?
    `,

    // 자유게시판 게시글 내용 불러오기
    handleReadFreeBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , SEARCH_COUNT
    FROM NOTICE_FREE
    WHERE NUM = ?
    `,

    // 자유게시판 게시글 조회수 증가
    handleFreeSearchCountPlus : `
    UPDATE NOTICE_FREE
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 자유게시판 댓글 목록
    handleReadFreeComments : `
    SELECT CONTENTS
         , USER_ID
         , USER_NAME
         , COMMENT_NUM
         , NOTICE_NAME
         , NOTICE_NUM
         , PARENTS_COMMENT_NUM
         , MODIFY_FLAG
         , DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s') AS CREATE_TIME
    FROM SKYNET.NOTICE_COMMENT
    WHERE USE_FLAG = 'Y'
    AND NOTICE_NAME = 'FREE'
    AND NOTICE_NUM = ?
    `,

    // 자유게시판 댓글 등록
    handleInsertFreeComment : `
    INSERT INTO SKYNET.NOTICE_COMMENT
    (
        COMMENT_NUM
      , PARENTS_COMMENT_NUM
      , NOTICE_NAME
      , NOTICE_NUM
      , USER_ID
      , USER_NAME
      , CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('COMMENT') FROM DUAL)
      , NULL
      , 'FREE'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 자유게시판 댓글 삭제
    handleDeleteFreeComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 자유게시판 SQL 목록

    //#region 공지사항 게시판 SQL 목록
    
    // 공지사항 게시글 목록 (Home 화면 전용)
    handleSelectNews : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
    FROM SKYNET.NOTICE_NEWS
    ORDER BY NUM DESC LIMIT 6
    `,

    // 공지사항 게시글 목록 (진짜 게시글 목록)
    handleSelectNews_ORG : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
    FROM SKYNET.NOTICE_NEWS
    ORDER BY NUM DESC
    `,

    // 공지사항 페이지 게시글 목록
    handleSelectNewsBoardPage : `
    SELECT PAGELIST.ROWNUM
          ,PAGELIST.NUM 
          ,PAGELIST.NOTICE_NAME
          ,PAGELIST.NOTICE_TITLE
          ,PAGELIST.NOTICE_CONTENTS
          ,PAGELIST.SEARCH_COUNT
    FROM (SELECT ROW_NUMBER() OVER ( ORDER BY NUM DESC) as ROWNUM
              , NUM
              , NOTICE_NAME
              , NOTICE_TITLE
              , NOTICE_CONTENTS
              , SEARCH_COUNT
          FROM SKYNET.NOTICE_NEWS BOARD
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,

    // 공지사항 페이지 목록
    handleSelectNewsBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
        , IF(MOD(TOTAL.TOTALITEM, 10) = 0, (TOTAL.TOTALITEM DIV 10) - 1, TOTAL.TOTALITEM DIV 10) AS TOTALPAGE
    FROM (SELECT max(@ROWNUM:=@ROWNUM +1) AS TotalItem
        FROM SKYNET.NOTICE_NEWS BOARD
            , (SELECT @ROWNUM:=0) ROWNUM
        ) Total
    `,
    
    // 공지사항 게시글 추가
    handleInsertNewsBoard : `
    INSERT INTO NOTICE_NEWS
    (
        NUM
    , NOTICE_ID
    , NOTICE_NAME
    , NOTICE_TITLE
    , NOTICE_CONTENTS
    )
    VALUES
    (
      (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
    , ?
    , ?
    , ?
    , ?
    )
    `,

    // 공지사항 게시글 삭제
    handleDeleteNewsBoard : `
    DELETE FROM NOTICE_NEWS
    WHERE NUM = ?
    `,

    // 공지사항 게시글 수정
    handleUpdateNewsBoard : `
    UPDATE NOTICE_NEWS
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
    WHERE NUM = ?
    `,

    // 공지사항 게시글 내용 불러오기
    handleReadNewsBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
         , NOTICE_CONTENTS
         , SEARCH_COUNT
    FROM NOTICE_NEWS
    WHERE NUM = ?
    `,

    // 공지사항 게시글 조회수 증가
    handleNewsSearchCountPlus : `
    UPDATE NOTICE_NEWS
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 공지사항 댓글 목록
    handleReadNewsComments : `
    SELECT CONTENTS
         , USER_ID
         , USER_NAME
         , COMMENT_NUM
         , NOTICE_NAME
         , NOTICE_NUM
         , PARENTS_COMMENT_NUM
         , MODIFY_FLAG
         , DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s') AS CREATE_TIME
    FROM SKYNET.NOTICE_COMMENT
    WHERE USE_FLAG = 'Y'
    AND NOTICE_NAME = 'NEWS'
    AND NOTICE_NUM = ?
    `,

    // 공지사항 댓글 등록
    handleInsertNewsComment : `
    INSERT INTO SKYNET.NOTICE_COMMENT
    (
        COMMENT_NUM
      , PARENTS_COMMENT_NUM
      , NOTICE_NAME
      , NOTICE_NUM
      , USER_ID
      , USER_NAME
      , CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('COMMENT') FROM DUAL)
      , NULL
      , 'NEWS'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 공지사항 댓글 삭제
    handleDeleteNewsComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,

    //#endregion 공지사항 게시판 SQL 목록

    //#region QA SQL 목록

    // QA 게시글 목록 (Home 화면 전용)
    handleSelectQA : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
    FROM SKYNET.NOTICE_QA
    ORDER BY NUM DESC LIMIT 6
    `,

    // QA 게시글 목록 (진짜 게시글 목록)
    handleSelectQA_ORG : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
    FROM SKYNET.NOTICE_QA
    ORDER BY NUM DESC
    `,

     // QA 페이지 게시글 목록
    handleSelectQaBoardPage : `
    SELECT PAGELIST.ROWNUM
          ,PAGELIST.NUM 
          ,PAGELIST.NOTICE_NAME
          ,PAGELIST.NOTICE_TITLE
          ,PAGELIST.NOTICE_CONTENTS
          ,PAGELIST.SEARCH_COUNT
    FROM (SELECT ROW_NUMBER() OVER ( ORDER BY NUM DESC) as ROWNUM
              , NUM
              , NOTICE_NAME
              , NOTICE_TITLE
              , NOTICE_CONTENTS
              , SEARCH_COUNT
          FROM SKYNET.NOTICE_QA BOARD
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,

    // QA 페이지 목록
    handleSelectQaBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
        , IF(MOD(TOTAL.TOTALITEM, 10) = 0,(TOTAL.TOTALITEM DIV 10) - 1, TOTAL.TOTALITEM DIV 10) AS TOTALPAGE
    FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) AS TOTALITEM
        FROM SKYNET.NOTICE_QA BOARD
            , (SELECT @ROWNUM:=0) ROWNUM
        ) TOTAL
    `,

    // QA 게시글 추가
    handleInsertQABoard : `
    INSERT INTO NOTICE_QA
    (
        NUM
      , NOTICE_ID
      , NOTICE_NAME
      , NOTICE_TITLE
      , NOTICE_CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
      , ?
      , ?
      , ?
      , ?
    )
    `,

    // QA 게시글 삭제
    handleDeleteQaBoard : `
    DELETE FROM NOTICE_QA
    WHERE NUM = ?
    `,

    // QA 게시글 수정
    handleUpdateQaBoard : `
    UPDATE NOTICE_QA
    SET NOTICE_TITLE = ?
    , NOTICE_CONTENTS = ?
    WHERE NUM = ?
    `,

    // QA 게시글 내용 불러오기
    handleReadQaBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS 
        , SEARCH_COUNT
    FROM NOTICE_QA
    WHERE NUM = ?
    `,

    // 자유게시판 게시글 조회수 증가
    handleQaSearchCountPlus : `
    UPDATE NOTICE_QA
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,


    // QA 댓글 목록
    handleReadQAComments : `
    SELECT CONTENTS
         , USER_ID
         , USER_NAME
         , COMMENT_NUM
         , NOTICE_NAME
         , NOTICE_NUM
         , PARENTS_COMMENT_NUM
         , MODIFY_FLAG
         , DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s') AS CREATE_TIME
    FROM SKYNET.NOTICE_COMMENT
    WHERE USE_FLAG = 'Y'
    AND NOTICE_NAME = 'QA'
    AND NOTICE_NUM = ?
    `,

    // QA 댓글 등록
    handleInsertQAComment : `
    INSERT INTO SKYNET.NOTICE_COMMENT
    (
        COMMENT_NUM
      , PARENTS_COMMENT_NUM
      , NOTICE_NAME
      , NOTICE_NUM
      , USER_ID
      , USER_NAME
      , CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('COMMENT') FROM DUAL)
      , NULL
      , 'QA'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // QA 댓글 삭제
    handleDeleteQAComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,


    //#endregion QA SQL 목록

    //#region 개발자노트 게시판 SQL 목록
    
    // 개발자노트 게시판 게시글 목록 (Home 화면 전용)
    handleSelectDeveloperNoteBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.NOTICE_DEVELOPER_NOTE
    ORDER BY NUM DESC LIMIT 6
    `,

    // 개발자노트 게시판 게시글 목록 (진짜 게시글 목록)
    handleSelectDeveloperNoteBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.NOTICE_DEVELOPER_NOTE
    ORDER BY NUM DESC
    `,

    // 개발자노트 게시판 페이지 게시글 목록
    handleSelectDeveloperNoteBoardPage : `
    SELECT PAGELIST.ROWNUM
          ,PAGELIST.NUM 
          ,PAGELIST.NOTICE_NAME
          ,PAGELIST.NOTICE_TITLE
          ,PAGELIST.NOTICE_CONTENTS
          ,PAGELIST.SEARCH_COUNT
    FROM (SELECT ROW_NUMBER() OVER ( ORDER BY NUM DESC) as ROWNUM
              , NUM
              , NOTICE_NAME
              , NOTICE_TITLE
              , NOTICE_CONTENTS
              , SEARCH_COUNT
          FROM SKYNET.NOTICE_DEVELOPER_NOTE BOARD
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,
    
    // 개발자노트 게시판 페이지 목록
    handleSelectDeveloperNoteBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
        , IF(MOD(TOTAL.TOTALITEM,10)=0 
        , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE
    FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM
        FROM SKYNET.NOTICE_DEVELOPER_NOTE BOARD
            , (SELECT @ROWNUM:=0) ROWNUM
        ) TOTAL
    `,

    // 개발자노트 게시판 게시글 추가
    handleInsertDeveloperNoteBoard : `
    INSERT INTO NOTICE_DEVELOPER_NOTE
    (
      NUM
    , NOTICE_ID
    , NOTICE_NAME
    , NOTICE_TITLE
    , NOTICE_CONTENTS
    )
    VALUES
    (
      (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
    , ?
    , ?
    , ?
    , ?
    )`,

    // 개발자노트 게시판 게시글 삭제
    handleDeleteDeveloperNoteBoard : `
    DELETE FROM NOTICE_DEVELOPER_NOTE
    WHERE NUM = ?
    `,
    
    // 개발자노트 게시판 게시글 수정
    handleUpdateDeveloperNoteBoard : `
    UPDATE SKYNET.NOTICE_DEVELOPER_NOTE
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
    WHERE NUM = ?
    `,

    // 개발자노트 게시판 게시글 내용 불러오기
    handleReadDeveloperNoteBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , SEARCH_COUNT
    FROM NOTICE_DEVELOPER_NOTE
    WHERE NUM = ?
    `,

    // 개발자노트 게시판 게시글 조회수 증가
    handleDeveloperNoteSearchCountPlus : `
    UPDATE NOTICE_DEVELOPER_NOTE
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 개발자노트 게시판 댓글 목록
    handleReadDeveloperNoteComments : `
    SELECT CONTENTS
         , USER_ID
         , USER_NAME
         , COMMENT_NUM
         , NOTICE_NAME
         , NOTICE_NUM
         , PARENTS_COMMENT_NUM
         , MODIFY_FLAG
         , DATE_FORMAT(CREATE_TIME, '%Y-%m-%d %H:%i:%s') AS CREATE_TIME
    FROM SKYNET.NOTICE_COMMENT
    WHERE USE_FLAG = 'Y'
    AND NOTICE_NAME = 'DEVELOPER_NOTE'
    AND NOTICE_NUM = ?
    `,

    // 개발자노트 게시판 댓글 등록
    handleInsertDeveloperNoteComment : `
    INSERT INTO SKYNET.NOTICE_COMMENT
    (
        COMMENT_NUM
      , PARENTS_COMMENT_NUM
      , NOTICE_NAME
      , NOTICE_NUM
      , USER_ID
      , USER_NAME
      , CONTENTS
    )
    VALUES
    (
        (SELECT SKYNET.NEXTVAL('COMMENT') FROM DUAL)
      , NULL
      , 'DEVELOPER_NOTE'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 개발자노트 게시판 댓글 삭제
    handleDeleteDeveloperNoteComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 개발자노트 게시판 SQL 목록

}