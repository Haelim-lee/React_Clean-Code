module.exports ={

    //#region 업무 SQL 목록
    
    // 업무 게시글 목록 (Home 화면 전용)
    handleSelectWorkBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_WORK
    ORDER BY NUM DESC LIMIT 6
    `,

    // 업무 게시글 목록 (진짜 게시글 목록)
    handleSelectWorkBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_WORK
    ORDER BY NUM DESC
    `,
    handleWorkCategoryList : `
    SELECT distinct NOTICE_CATEGORY
    FROM skynet.workroom_work
    `,
    // 업무 페이지 게시글 목록
    handleSelectWorkBoardPage : `
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
          FROM SKYNET.WORKROOM_WORK BOARD
          WHERE notice_Category = ?
         ) PAGELIST
    WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,
    
    // 업무 페이지 목록
    handleSelectWorkBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
    , IF(MOD(TOTAL.TOTALITEM,10)=0 , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM FROM (SELECT NOTICE_CATEGORY FROM SKYNET.WORKROOM_work WHERE NOTICE_CATEGORY=?) BOARD , (SELECT @ROWNUM:=0) ROWNUM) TOTAL
    `,

    // 업무 게시글 추가
    handleInsertWorkBoard : `
    INSERT INTO WORKROOM_WORK
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

    // 업무 게시글 삭제
    handleDeleteWorkBoard : `
    DELETE FROM WORKROOM_WORK
    WHERE NUM = ?
    `,
    
    // 업무 게시글 수정
    handleUpdateWorkBoard : `
    UPDATE SKYNET.WORKROOM_WORK
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
      , NOTICE_CATEGORY = ?
      , Public = ?
    WHERE NUM = ?
    `,

    // 업무 게시글 내용 불러오기
    handleReadWorkBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , NOTICE_CATEGORY
        , SEARCH_COUNT
        , Public
    FROM WORKROOM_WORK
    WHERE NUM = ?
    `,

    // 업무 게시글 조회수 증가
    handleWorkSearchCountPlus : `
    UPDATE WORKROOM_WORK
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 업무 댓글 목록
    handleReadWorkComments : `
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
    AND NOTICE_NAME = 'WORKROOM_WORK'
    AND NOTICE_NUM = ?
    `,

    // 업무 댓글 등록
    handleInsertWorkComment : `
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
      , 'WORKROOM_WORK'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 업무 댓글 삭제
    handleDeleteWorkComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 업무 SQL 목록
}