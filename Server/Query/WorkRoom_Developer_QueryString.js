module.exports ={
    
    //#region 프로그래밍 SQL 목록
    
    // 프로그래밍 게시글 목록 (Home 화면 전용)
    handleSelectDeveloperBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_DEVELOPER
    ORDER BY NUM DESC LIMIT 6
    `,

    // 프로그래밍 게시글 목록 (진짜 게시글 목록)
    handleSelectDeveloperBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_DEVELOPER
    ORDER BY NUM DESC
    `,

    // 프로그래밍 페이지 게시글 목록
    handleSelectDeveloperBoardPage : `
    SELECT PAGELIST.ROWNUM
          ,PAGELIST.NUM 
          ,PAGELIST.NOTICE_NAME
          ,PAGELIST.NOTICE_CATEGORY
          ,PAGELIST.NOTICE_TITLE
          ,PAGELIST.NOTICE_CONTENTS
          ,PAGELIST.SEARCH_COUNT
          ,PAGELIST.PUBLIC
    FROM (SELECT ROW_NUMBER() OVER ( ORDER BY NUM DESC) as ROWNUM
              , NUM
              , NOTICE_NAME
              , NOTICE_CATEGORY
              , NOTICE_TITLE
              , NOTICE_CONTENTS
              , SEARCH_COUNT
              , PUBLIC
          FROM SKYNET.WORKROOM_DEVELOPER BOARD
          WHERE notice_Category = ?
          ) PAGELIST
          WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,

    handleDeveloperCategoryList : `
    SELECT distinct NOTICE_CATEGORY
    FROM skynet.workroom_developer
    `,
    
    // 프로그래밍 페이지 목록
    handleSelectDeveloperBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
    , IF(MOD(TOTAL.TOTALITEM,10)=0 , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM FROM (SELECT NOTICE_CATEGORY FROM SKYNET.WORKROOM_DEVELOPER WHERE NOTICE_CATEGORY=?) BOARD , (SELECT @ROWNUM:=0) ROWNUM) TOTAL
    `,

    // 프로그래밍 게시글 추가
    handleInsertDeveloperBoard : `
    INSERT INTO WORKROOM_DEVELOPER
    (
      NUM
    , NOTICE_ID
    , NOTICE_NAME
    , NOTICE_TITLE
    , NOTICE_CONTENTS
    , NOTICE_CATEGORY
    , Public
    )
    VALUES
    (
      (SELECT SKYNET.NEXTVAL('BORD') FROM DUAL)
    , ?
    , ?
    , ?
    , ?
    , ?
    , ?
    )`,

    // 프로그래밍 게시글 삭제
    handleDeleteDeveloperBoard : `
    DELETE FROM WORKROOM_DEVELOPER
    WHERE NUM = ?
    `,
    
    // 프로그래밍 게시글 수정
    handleUpdateDeveloperBoard : `
    UPDATE SKYNET.WORKROOM_DEVELOPER
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
      , NOTICE_CATEGORY = ?
      , Public = ?
    WHERE NUM = ?
    `,

    // 프로그래밍 게시글 내용 불러오기
    handleReadDeveloperBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , NOTICE_CATEGORY
        , SEARCH_COUNT
        , Public
    FROM WORKROOM_DEVELOPER
    WHERE NUM = ?
    `,

    // 프로그래밍 게시글 조회수 증가
    handleDeveloperSearchCountPlus : `
    UPDATE WORKROOM_DEVELOPER
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 프로그래밍 댓글 목록
    handleReadDeveloperComments : `
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
    AND NOTICE_NAME = 'WORKROOM_DEVELOPER'
    AND NOTICE_NUM = ?
    `,

    // 프로그래밍 댓글 등록
    handleInsertDeveloperComment : `
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
      , 'WORKROOM_DEVELOPER'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 프로그래밍 댓글 삭제
    handleDeleteDeveloperComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 프로그래밍 SQL 목록
}