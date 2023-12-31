# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: device.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0c\x64\x65vice.proto\"6\n\x06\x44\x65vice\x12\x0c\n\x04host\x18\x01 \x01(\t\x12\x0c\n\x04user\x18\x02 \x01(\t\x12\x10\n\x08password\x18\x03 \x01(\t\"\x1a\n\nConfigText\x12\x0c\n\x04text\x18\x01 \x01(\t\"J\n\rConfigRequest\x12\x17\n\x06\x64\x65vice\x18\x01 \x01(\x0b\x32\x07.Device\x12 \n\x0b\x63onfig_text\x18\x02 \x01(\x0b\x32\x0b.ConfigText\"\x1b\n\x0b\x43ommandText\x12\x0c\n\x04text\x18\x01 \x01(\t\"M\n\x0e\x43ommandRequest\x12\x17\n\x06\x64\x65vice\x18\x01 \x01(\x0b\x32\x07.Device\x12\"\n\x0c\x63ommand_text\x18\x02 \x01(\x0b\x32\x0c.CommandText\"9\n\x0c\x45rrorMessage\x12\x18\n\x04type\x18\x01 \x01(\x0e\x32\n.ErrorType\x12\x0f\n\x07message\x18\x02 \x01(\t\"M\n\x06Result\x12\r\n\x05\x65rror\x18\x01 \x01(\x08\x12$\n\rerror_message\x18\x02 \x01(\x0b\x32\r.ErrorMessage\x12\x0e\n\x06output\x18\x03 \x01(\t*+\n\tErrorType\x12\x11\n\rNOT_IMPLEMENT\x10\x00\x12\x0b\n\x07UNKNOWN\x10\x01\x32i\n\x06\x43onfig\x12\x1b\n\x03get\x12\x07.Device\x1a\x0b.ConfigText\x12\x1e\n\x03set\x12\x0e.ConfigRequest\x1a\x07.Result\x12\"\n\x07\x63ompare\x12\x0e.ConfigRequest\x1a\x07.Result2.\n\x07\x43ommand\x12#\n\x07\x65xecute\x12\x0f.CommandRequest\x1a\x07.Resultb\x06proto3')

_ERRORTYPE = DESCRIPTOR.enum_types_by_name['ErrorType']
ErrorType = enum_type_wrapper.EnumTypeWrapper(_ERRORTYPE)
NOT_IMPLEMENT = 0
UNKNOWN = 1


_DEVICE = DESCRIPTOR.message_types_by_name['Device']
_CONFIGTEXT = DESCRIPTOR.message_types_by_name['ConfigText']
_CONFIGREQUEST = DESCRIPTOR.message_types_by_name['ConfigRequest']
_COMMANDTEXT = DESCRIPTOR.message_types_by_name['CommandText']
_COMMANDREQUEST = DESCRIPTOR.message_types_by_name['CommandRequest']
_ERRORMESSAGE = DESCRIPTOR.message_types_by_name['ErrorMessage']
_RESULT = DESCRIPTOR.message_types_by_name['Result']
Device = _reflection.GeneratedProtocolMessageType('Device', (_message.Message,), {
  'DESCRIPTOR' : _DEVICE,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:Device)
  })
_sym_db.RegisterMessage(Device)

ConfigText = _reflection.GeneratedProtocolMessageType('ConfigText', (_message.Message,), {
  'DESCRIPTOR' : _CONFIGTEXT,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:ConfigText)
  })
_sym_db.RegisterMessage(ConfigText)

ConfigRequest = _reflection.GeneratedProtocolMessageType('ConfigRequest', (_message.Message,), {
  'DESCRIPTOR' : _CONFIGREQUEST,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:ConfigRequest)
  })
_sym_db.RegisterMessage(ConfigRequest)

CommandText = _reflection.GeneratedProtocolMessageType('CommandText', (_message.Message,), {
  'DESCRIPTOR' : _COMMANDTEXT,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:CommandText)
  })
_sym_db.RegisterMessage(CommandText)

CommandRequest = _reflection.GeneratedProtocolMessageType('CommandRequest', (_message.Message,), {
  'DESCRIPTOR' : _COMMANDREQUEST,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:CommandRequest)
  })
_sym_db.RegisterMessage(CommandRequest)

ErrorMessage = _reflection.GeneratedProtocolMessageType('ErrorMessage', (_message.Message,), {
  'DESCRIPTOR' : _ERRORMESSAGE,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:ErrorMessage)
  })
_sym_db.RegisterMessage(ErrorMessage)

Result = _reflection.GeneratedProtocolMessageType('Result', (_message.Message,), {
  'DESCRIPTOR' : _RESULT,
  '__module__' : 'device_pb2'
  # @@protoc_insertion_point(class_scope:Result)
  })
_sym_db.RegisterMessage(Result)

_CONFIG = DESCRIPTOR.services_by_name['Config']
_COMMAND = DESCRIPTOR.services_by_name['Command']
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _ERRORTYPE._serialized_start=422
  _ERRORTYPE._serialized_end=465
  _DEVICE._serialized_start=16
  _DEVICE._serialized_end=70
  _CONFIGTEXT._serialized_start=72
  _CONFIGTEXT._serialized_end=98
  _CONFIGREQUEST._serialized_start=100
  _CONFIGREQUEST._serialized_end=174
  _COMMANDTEXT._serialized_start=176
  _COMMANDTEXT._serialized_end=203
  _COMMANDREQUEST._serialized_start=205
  _COMMANDREQUEST._serialized_end=282
  _ERRORMESSAGE._serialized_start=284
  _ERRORMESSAGE._serialized_end=341
  _RESULT._serialized_start=343
  _RESULT._serialized_end=420
  _CONFIG._serialized_start=467
  _CONFIG._serialized_end=572
  _COMMAND._serialized_start=574
  _COMMAND._serialized_end=620
# @@protoc_insertion_point(module_scope)
