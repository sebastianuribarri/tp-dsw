export enum MatchStatus {
  TBD = "TBD",      // Time To Be Defined
  NS = "NS",        // Not Started
  FIRST_HALF = "1H", // First Half, Kick Off
  HALFTIME = "HT",   // Halftime
  SECOND_HALF = "2H", // Second Half, 2nd Half Started
  EXTRA_TIME = "ET",  // Extra Time
  BREAK_TIME = "BT",  // Break Time
  PENALTY = "P",      // Penalty In Progress
  SUSPENDED = "SUSP", // Match Suspended
  INTERRUPTED = "INT",// Match Interrupted
  FINISHED = "FT",    // Match Finished
  AFTER_EXTRA_TIME = "AET", // Match Finished after Extra Time
  AFTER_PENALTY = "PEN",    // Match Finished after Penalty Shootout
  POSTPONED = "PST",        // Match Postponed
  CANCELLED = "CANC",       // Match Cancelled
  ABANDONED = "ABD",        // Match Abandoned
}
