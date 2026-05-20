CREATE TABLE IF NOT EXISTS check_ins (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  sleep_hours REAL,
  mood INTEGER,
  energy INTEGER,
  focus INTEGER,
  hydration REAL,
  study_hours REAL,
  training_done INTEGER NOT NULL DEFAULT 0,
  productivity_score INTEGER,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_check_ins_user_date ON check_ins(user_id, date);
