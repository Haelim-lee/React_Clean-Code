module.exports ={

    //#region 기획 SQL 목록
    
    // 기획 게시글 목록 (Home 화면 전용)
    handleSelectPlanBoard : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_PLAN
    ORDER BY NUM DESC LIMIT 6
    `,

    // 기획 게시글 목록 (진짜 게시글 목록)
    handleSelectPlanBoard_ORG : `
    SELECT NUM
         , NOTICE_NAME
         , NOTICE_TITLE
    FROM SKYNET.WORKROOM_PLAN
    ORDER BY NUM DESC
    `,
    handlePlanCategoryList : `
    SELECT distinct NOTICE_CATEGORY
    FROM skynet.workroom_plan
    `,

    // 기획 페이지 게시글 목록
    handleSelectPlanBoardPage : `
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
          FROM SKYNET.WORKROOM_PLAN BOARD
          WHERE notice_Category = ?
         ) PAGELIST
    WHERE PAGELIST.ROWNUM BETWEEN ? AND ?
    `,
    
    // 기획 페이지 목록
    handleSelectPlanBoardPageList : `
    SELECT TOTAL.TOTALITEM AS ITEMCOUNT
    , IF(MOD(TOTAL.TOTALITEM,10)=0 , (TOTAL.TOTALITEM DIV 10) - 1,TOTAL.TOTALITEM DIV 10) as TOTALPAGE FROM (SELECT MAX(@ROWNUM:=@ROWNUM +1) as TOTALITEM FROM (SELECT NOTICE_CATEGORY FROM SKYNET.WORKROOM_plan WHERE NOTICE_CATEGORY=?) BOARD , (SELECT @ROWNUM:=0) ROWNUM) TOTAL
    `,

    // 기획 게시글 추가
    handleInsertPlanBoard : `
    INSERT INTO WORKROOM_PLAN
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

    // 기획 게시글 삭제
    handleDeletePlanBoard : `
    DELETE FROM WORKROOM_PLAN
    WHERE NUM = ?
    `,
    
    // 기획 게시글 수정
    handleUpdatePlanBoard : `
    UPDATE SKYNET.WORKROOM_PLAN
    SET NOTICE_TITLE = ?
      , NOTICE_CONTENTS = ?
      , NOTICE_CATEGORY = ?
      , Public = ?
    WHERE NUM = ?
    `,

    // 기획 게시글 내용 불러오기
    handleReadPlanBoard : `
    SELECT NUM
        , NOTICE_NAME
        , NOTICE_TITLE
        , NOTICE_CONTENTS
        , NOTICE_CATEGORY
        , SEARCH_COUNT
        , Public
    FROM WORKROOM_PLAN
    WHERE NUM = ?
    `,

    // 기획 게시글 조회수 증가
    handlePlanSearchCountPlus : `
    UPDATE WORKROOM_PLAN
    SET SEARCH_COUNT = SEARCH_COUNT + 1
    WHERE NUM = ?
    `,

    // 기획 댓글 목록
    handleReadPlanComments : `
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
    AND NOTICE_NAME = 'WORKROOM_PLAN'
    AND NOTICE_NUM = ?
    `,

    // 기획 댓글 등록
    handleInsertPlanComment : `
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
      , 'WORKROOM_PLAN'
      , ?
      , ?
      , ?
      , ?
    )
    `,
    
    // 기획 댓글 삭제
    handleDeletePlanComment : `
    UPDATE SKYNET.NOTICE_COMMENT
    SET USE_FLAG = 'N'
    WHERE COMMENT_NUM = ? 
    `,
    
    //#endregion 기획 SQL 목록
}