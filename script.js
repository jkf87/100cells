document.addEventListener('DOMContentLoaded', function() {
    // 그리드 컨테이너 요소를 가져옵니다
    const gridContainer1 = document.getElementById('grid-container-1');
    const gridContainer2 = document.getElementById('grid-container-2');
    const answerGrid1 = document.getElementById('answer-grid-1');
    const answerGrid2 = document.getElementById('answer-grid-2');
    
    // 초기 그리드 생성
    createGrids();
    
    // "새로운 문제" 버튼에 이벤트 리스너 추가
    document.getElementById('new-problem').addEventListener('click', createGrids);
    
    // "인쇄하기" 버튼에 이벤트 리스너 추가
    document.getElementById('print-sheet').addEventListener('click', printSheet);
    
    // 두 개의 그리드 생성 함수
    function createGrids() {
        // 문제 그리드 생성
        const grid1Data = createGrid(gridContainer1);
        const grid2Data = createGrid(gridContainer2);
        
        // 정답 그리드 생성
        createAnswerGrid(answerGrid1, grid1Data);
        createAnswerGrid(answerGrid2, grid2Data);
    }
    
    // 그리드 생성 함수
    function createGrid(container) {
        // 그리드 컨테이너를 초기화합니다
        container.innerHTML = '';
        
        // 0-9 사이의 숫자 배열 생성
        const numbers = Array.from({length: 10}, (_, i) => i);
        
        // 숫자 배열을 섞습니다 (상단 행과 왼쪽 열용)
        const topNumbers = shuffleArray([...numbers]);
        const leftNumbers = shuffleArray([...numbers]);
        
        // 왼쪽 상단 모서리 셀 생성
        const cornerCell = document.createElement('div');
        cornerCell.className = 'cell corner-cell';
        cornerCell.textContent = '+';
        container.appendChild(cornerCell);
        
        // 상단 헤더 행 생성
        for (let i = 0; i < 10; i++) {
            const headerCell = document.createElement('div');
            headerCell.className = 'cell header-cell';
            headerCell.textContent = topNumbers[i];
            container.appendChild(headerCell);
        }
        
        // 나머지 행 생성
        for (let row = 0; row < 10; row++) {
            // 각 행의 왼쪽 헤더 셀
            const rowHeaderCell = document.createElement('div');
            rowHeaderCell.className = 'cell header-cell';
            rowHeaderCell.textContent = leftNumbers[row];
            container.appendChild(rowHeaderCell);
            
            // 나머지 셀 (빈 셀로 유지 - 학생들이 채울 것)
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                // 정답을 data 속성에 저장 (참고용이며 보이지 않음)
                cell.dataset.answer = leftNumbers[row] + topNumbers[col];
                container.appendChild(cell);
            }
        }
        
        // 그리드 데이터 반환 (정답 그리드 생성에 사용)
        return { topNumbers, leftNumbers };
    }
    
    // 정답 그리드 생성 함수
    function createAnswerGrid(container, gridData) {
        // 그리드 컨테이너를 초기화합니다
        container.innerHTML = '';
        
        const { topNumbers, leftNumbers } = gridData;
        
        // 왼쪽 상단 모서리 셀 생성
        const cornerCell = document.createElement('div');
        cornerCell.className = 'cell corner-cell';
        cornerCell.textContent = '+';
        container.appendChild(cornerCell);
        
        // 상단 헤더 행 생성
        for (let i = 0; i < 10; i++) {
            const headerCell = document.createElement('div');
            headerCell.className = 'cell header-cell';
            headerCell.textContent = topNumbers[i];
            container.appendChild(headerCell);
        }
        
        // 나머지 행 생성
        for (let row = 0; row < 10; row++) {
            // 각 행의 왼쪽 헤더 셀
            const rowHeaderCell = document.createElement('div');
            rowHeaderCell.className = 'cell header-cell';
            rowHeaderCell.textContent = leftNumbers[row];
            container.appendChild(rowHeaderCell);
            
            // 정답 셀 생성
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell answer-cell';
                // 정답 표시
                cell.textContent = leftNumbers[row] + topNumbers[col];
                container.appendChild(cell);
            }
        }
    }
    
    // 인쇄 함수
    function printSheet() {
        // 인쇄 대화상자 열기
        window.print();
    }
    
    // 배열을 무작위로 섞는 유틸리티 함수
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}); 