package handleSQL

import (
	"log"
	"fmt"
	"strings"
	_ "github.com/go-sql-driver/mysql"
)


func SelectMovesByKeyWord(keyWord string) []Move {
	fmt.Println("SelectMovesByKeyWord, keyWord:", keyWord)
	db := ConnectDB()
	defer db.Close()

	keyWord = strings.Join([]string{keyWord, "%"}, "")

	// Statusが指定されている場合
	query := `
		select moveID, moveName
			from moves
			where moves.moveName like ?
			order by moveID`

	rows, err := db.Query(query, &keyWord)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var moves []Move
	for rows.Next() {
		var move_id int
		var move_name string
		move_type := ""
		move_class := ""
		move_pp := 0
		move_accuracy := 0
		move_priority := 0
		move_power := 0
		move_description := ""

		err := rows.Scan(&move_id, &move_name)
		if err != nil {
			panic(err)
		}
		moves = append(moves, Move {
			ID:    move_id,
			Name:  move_name,
			Class: move_class,
			Type:  move_type,
			PP: move_pp,
			Accuracy: move_accuracy,
			Priority: move_priority,
			Power: move_power,
			Description: move_description,
		})
	}

	return moves
}