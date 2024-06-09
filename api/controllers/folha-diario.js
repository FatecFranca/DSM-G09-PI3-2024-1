const JournalRecord = require('../models/folha-diario');

async function createJournalRecord(req, res) {
  try {
    const itineraryID = req.params.itineraryID;
    const record = req.body;

    record.roteiroId = itineraryID;
    record.data_criacao = Date.now();
    record.data_atualizacao = record.data_criacao;
    const newJournalRecord = new JournalRecord(record);
    const savedRecord = await newJournalRecord.save();

    res.status(201).json(savedRecord);
  } catch (error) {
    console.error('Erro ao criar registro de diário:', error);
    res.status(500).json({ error: 'Erro ao criar registro de diário' });
  }
}

async function listJournalRecords(req, res) {
  try {
    const itineraryID = req.params.itineraryID;

    const journalRecords = await JournalRecord.find({ roteiroId: itineraryID, deleted: false }).populate('gasto');
    res.status(200).json(journalRecords);
  } catch (error) {
    console.error('Erro ao listar registros de diário por roteiro:', error);
    res.status(500).json({ error: 'Erro ao listar registros de diário por roteiro' });
  }
}

async function getJournalRecordById(req, res) {
  try {
    const journalRecordID = req.params.journalRecordID;

    const journalRecord = await JournalRecord.findById(journalRecordID).populate('gasto');
    if (!journalRecord || journalRecord.deleted) {
      return res.status(404).json({ message: 'Registro de diário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter registro de diário:', error);
    res.status(500).json({ error: 'Erro ao obter registro de diário' });
  }
}

async function updateJournalRecord(req, res) {
  try {
    const journalRecordID = req.params.journalRecordID;
    const updatedData = req.body;
    updatedData.data_atualizacao = Date.now();

    let existingRecord = await JournalRecord.findById(journalRecordID);
    if (!existingRecord) {
      return res.status(404).json({ message: 'Registro de diário não encontrado' });
    }

    if (req.method === 'DELETE') {
      existingRecord.deleted = true;
    } else {
      existingRecord = Object.assign(existingRecord, { ...updatedData });
    }

    const updatedDoc = await existingRecord.save();
    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error('Erro ao atualizar registro de diário:', error);
    res.status(500).json({ error: 'Erro ao atualizar registro de diário' });
  }
}

module.exports = {
  createJournalRecord,
  listJournalRecords,
  getJournalRecordById,
  updateJournalRecord,
};
