# TODO: Tempory copy of _typeshed.dbapi, until that file is available in all typecheckers.
# Does not exist at runtime.

from collections.abc import Mapping, Sequence
from typing import Any, Protocol

DBAPITypeCode = Any | None
# Strictly speaking, this should be a Sequence, but the type system does
# not support fixed-length sequences.
DBAPIColumnDescription = tuple[str, DBAPITypeCode, int | None, int | None, int | None, int | None, bool | None]

class DBAPIConnection(Protocol):
    def close(self) -> object: ...
    def commit(self) -> object: ...
    # optional:
    # def rollback(self) -> Any: ...
    def cursor(self) -> DBAPICursor: ...

class DBAPICursor(Protocol):
    @property
    def description(self) -> Sequence[DBAPIColumnDescription] | None: ...
    @property
    def rowcount(self) -> int: ...
    # optional:
    # def callproc(self, __procname: str, __parameters: Sequence[Any] = ...) -> Sequence[Any]: ...
    def close(self) -> object: ...
    def execute(self, __operation: str, __parameters: Sequence[Any] | Mapping[str, Any] = ...) -> object: ...
    def executemany(self, __operation: str, __seq_of_parameters: Sequence[Sequence[Any]]) -> object: ...
    def fetchone(self) -> Sequence[Any] | None: ...
    def fetchmany(self, __size: int = ...) -> Sequence[Sequence[Any]]: ...
    def fetchall(self) -> Sequence[Sequence[Any]]: ...
    # optional:
    # def nextset(self) -> None | Literal[True]: ...
    arraysize: int
    def setinputsizes(self, __sizes: Sequence[DBAPITypeCode | int | None]) -> object: ...
    def setoutputsize(self, __size: int, __column: int = ...) -> object: ...
