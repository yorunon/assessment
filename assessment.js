(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
    * 指定した要素の子どもを全て削除する
    * @param {HTMLElement} element HTMLの要素
    */

    function removeAllchildren(element) {
        while (element.firstChild) { //子供の要素が有る限り削除
            element.removeChild(element.firstChild);
        }
    }

        userNameInput.onkeydown = (event) => {
        if (event.keyCode === 13) {
            assessmentButton.onclick();
            // TODO ボタンのonclick() 処理を呼び出す
        }
    };

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { //名前入力が空なら処理を終了する。
            return;
            //関数の処理の中で、 return; は、戻り値なしに、そこで処理を終了するという意味です。
            //ここでは、名前の文字列の長さが 0 だった場合は、処理を終了すると記述しています。
        }
        console.log(userName);
   // 診断結果表示エリアの作成
        removeAllchildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
    
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //Tweetエリアの作成
        removeAllchildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURI('あんたのiitoko');
            + '&ref_src=twsrc%5Etfw'
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text',result);
        anchor.setAttribute('data-lang', 'ja');
        anchor.setAttribute('data-show-count', 'false');
        anchor.innerText = 'Tweet #あんたのiitoko';
        tweetDivided.appendChild(anchor);
        twttr.widgets.load();
    }


    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
    ];
    

    /**
     * 名前の文字列を渡すと診断結果を返す
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */

    function assessment(userName) {
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        
        // 文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

         // TODO {userName} をユーザーの名前に置き換える
         result = result.replace(/\{userName\}/g, userName);
         return result;

    }
    console.assert(
        assessment('伊藤') === '伊藤のいいところはその全てです。ありのままの伊藤自身がいいところなのです。' ,
        '結果の特定文言の書き換えが正しくありません。'
    )
        console.assert(
            assessment('太郎') === assessment('太郎'),
            '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません.'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );



})();
